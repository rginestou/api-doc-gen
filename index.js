const fs = require('fs')

const argv = require('minimist')(process.argv.slice(2))

const in_file = argv.in || argv.i
const out_file = argv.out || argv.o || "API.doc"
const api_title = argv.title || argv.t

if (!in_file) {
	console.error("Please specify an input file --in")
	process.exit(1)
}

const content = fs.readFileSync(in_file, 'utf8').split('\n')

var in_define = -1
var in_code = false
var in_type = ""
var define_name = ""
var current_block = {}
var api_groups = {}
var api_defines = {}
var regex, match

// =========================================
// PARSE API COMMENTS
// =========================================

let l = -1
while (l + 1 < content.length) {
	l++
	let line = content[l]

	// Start of comment block
	if (line.startsWith('/**')) {
		current_block = {
			params: [],
			success: [],
			error: [],
		}
		in_code = false
		continue
	}

	// End of comment block
	if (line.startsWith(' */')) {
		if (in_define >= 0) {
			api_defines[define_name] = content.slice(in_define, l)
		} else {
			let group = current_block.group || ""
			if (!api_groups[group]) api_groups[group] = []
			api_groups[group].push(current_block)
		}
		in_define = -1
		define_name = ""
		in_code = false
		continue
	}

	// @apiDefine
	regex = /@apiDefine (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = false
		in_define = l + 1
		define_name = match[1]
		continue
	}

	// @apiUse
	regex = /@apiUse (.+)/g
	match = regex.exec(line)
	if (match) {
		if (!api_defines[match[1]]) {
			console.error(match[1], "not defined")
			process.exit(1)
		}
		content.splice(l + 1, 0, ...api_defines[match[1]])
		continue
	}

	// @api
	regex = /@api {(\w+)} ([/\w]+) (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = false
		current_block.method = match[1].toUpperCase()
		current_block.path = match[2]
		current_block.description = match[3]
		continue
	}

	// @apiName
	regex = /@apiName (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = false
		current_block.name = match[1]
		continue
	}

	// @apiGroup
	regex = /@apiGroup (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = false
		current_block.group = match[1]
		continue
	}

	// @apiParam
	regex = /@apiParam {(\w+)} (\w+) (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = false
		current_block.params.push({
			type: match[1],
			name: match[2],
			description: match[3],
		})
		continue
	}

	// @apiSuccess
	regex = /@apiSuccess (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = true
		in_type = "success"
		current_block.success.push({
			title: match[1],
			content: "",
		})
		continue
	}

	// @apiError
	regex = /@apiError (.+)/g
	match = regex.exec(line)
	if (match) {
		in_code = true
		in_type = "success"
		current_block.success.push({
			title: match[1],
			content: "",
		})
		continue
	}

	if (in_code) {
		if (line.startsWith(' * ')) {
			let n = current_block[in_type].length
			current_block[in_type][n - 1].content += line.slice(3) + '\n'
		}
	}
}

// =========================================
// CONVERT TO MARKDOWN
// =========================================

let groups = Object.entries(api_groups)

var output = ""
if (api_title)
	output += '# ' + api_title + ' API Documentation\n\n'
else
	output += '# API Documentation\n\n'

// Table
for (let group of groups) {
	if (!group[0]) continue
	output += '- [' + group[0] + '](#' + group[0].toLowerCase() + ')\n'
	for (let route of group[1])
		output += '\t- [' + route.description + '](#' + route.description.replace(/\s/g, '-') + ')\n'
}
output += '\n'

// Groups
for (let group of groups) {
	for (let route of group[1]) {
		output += route.name ? '# ' + route.name + '\n\n' : ''
		output += route.description ? '## ' + route.description + '\n\n' : ''
		output += route.method ? '\t' + route.method + ' ' + route.path + '\n\n' : ''

		if (route.params.length > 0) {
			output += '### Parameters\n\n'
			output += '| Name | Type | Description |\n'
			output += '|------|------|-------------|\n'
			for (let param of route.params)
				output += '| ' + param.name + ' | ' + param.type + ' | ' + param.description + ' |\n'
			output += '\n'
		}

		if (route.success.length > 0) {
			output += '### Success Response\n\n'
			for (let success of route.success) {
				output += success.title ? success.title + '\n\n' : ''
				output += '```json\n'
				output += success.content.trim() + '\n'
				output += '```\n\n'
			}
		}
	}
}

fs.writeFileSync(out_file, output)

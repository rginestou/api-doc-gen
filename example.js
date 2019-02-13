/**
 * @apiDefine UserExample
 *   "id": "6d9e0b4c17bc"
 *   "first_name": "John",
 *   "last_name": "Doe",
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError User not found
 *
 * HTTP/1.1 404 Not Found
 */

/**
 * @api {get} / Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id News unique ID
 *
 * @apiSuccess Success-Response:
 *
 * HTTP/1.1 200
 * {
 *  @apiUse UserExample
 * }
 *
 * @apiUse UserNotFoundError
 */

/**
 * @api {post} / Add User
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {String} first_name User first name
 * @apiParam {String} last_name User last name
 *
 * @apiSuccess Success-Response:
 *
 * HTTP/1.1 200
 * {
 *  @apiUse UserExample
 * }
 *
 * @apiUse UserNotFoundError
 */

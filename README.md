# API Documentation Generator

Generates API routes Markdown documententation by parsing file comments.

Supports macro for fast and consistent documentation.

    node index.js --in example.js --out API.md --title "User Service"

```js
/**
 * @apiDefine UserExample
 *   "id": "6d9e0b4c17bc",
 *   "first_name": "John",
 *   "last_name": "Doe",
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError User not found
 *
 * @apiStatus HTTP/1.1 404 Not Found
 */

/**
 * @api {get} /
 * @apiDescription
 * Request User information
 *
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id News unique ID
 *
 * @apiSuccess Success-Response:
 *
 * @apiStatus HTTP/1.1 200
 * {
 *  @apiUse UserExample
 * }
 *
 * @apiUse UserNotFoundError
 */

/**
 * @api {post} /
 * @apiDescription
 * Add User
 *
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {String} first_name User first name
 * @apiParam {String} last_name User last name
 * @apiParam {String} [age] User last name
 *
 * @apiSuccess Success-Response:
 *
 * @apiStatus HTTP/1.1 200
 * {
 *  @apiUse UserExample
 * }
 *
 * @apiUse UserNotFoundError
 */
```

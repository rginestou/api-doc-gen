# User Service API Documentation

- [User](#user)
	- [Request User information](#Request-User-information)
	- [Add User](#Add-User)

# User

## GetUser

### Request User information

	GET /

### Parameters

| Name | Type | Description |
|------|------|-------------|
| id | String | News unique ID |

### Success Response

Success-Response:

```json
HTTP/1.1 200
{
  "id": "6d9e0b4c17bc"
  "first_name": "John",
  "last_name": "Doe",
}
```

User not found

```json
HTTP/1.1 404 Not Found
```

## AddUser

### Add User

	POST /

### Parameters

| Name | Type | Description |
|------|------|-------------|
| first_name | String | User first name |
| last_name | String | User last name |

### Success Response

Success-Response:

```json
HTTP/1.1 200
{
  "id": "6d9e0b4c17bc"
  "first_name": "John",
  "last_name": "Doe",
}
```

User not found

```json
HTTP/1.1 404 Not Found
```


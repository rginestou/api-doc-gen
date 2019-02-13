# User Service API Documentation

- [User](#user)
	- [GetUser](#GetUser)
	- [AddUser](#AddUser)

# User

## GetUser

Request User information



	GET /

### Parameters

| Name | Type | Description |
|------|------|-------------|
| id | String | News unique ID |

### Success Response

Success-Response:

**HTTP/1.1 200**

```json
{
  "id": "6d9e0b4c17bc",
  "first_name": "John",
  "last_name": "Doe",
}
```

### Error Response

User not found

**HTTP/1.1 404 Not Found**

## AddUser

Add User



	POST /

### Parameters

| Name | Type | Description |
|------|------|-------------|
| first_name | String | User first name |
| last_name | String | User last name |
| [age] | String | User last name |

### Success Response

Success-Response:

**HTTP/1.1 200**

```json
{
  "id": "6d9e0b4c17bc",
  "first_name": "John",
  "last_name": "Doe",
}
```

### Error Response

User not found

**HTTP/1.1 404 Not Found**


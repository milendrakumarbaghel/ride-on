# Backend API Documentation

## /users/register Endpoint

## Description
Registers a new user with the provided information.

## HTTP Method
`POST`

## Endpoint
`/users/register`

## Request Body
- fullName (object)
    - fullName.firstName (required, string, min length: 3)
    - fullName.lastName (string, min length: 3)
- email (required, valid email)
- password (required, string, min length: 6)

## Example Data for Register a User

```json
{
    "fullName": {
        "firstName": "first_name",
        "lastName": "last_name"
    },
    "email": "test@gmail.com",
    "password": "test_password"
}
```

## Success Response
- 201 Created: Returns a JSON with a token and user data.

## Error Response
- 400 Bad Request: Returns validation errors.

## Example Response
```json
{
  "token": "your_jwt_token_here",
  "user": {
    "fullName": {
            "firstName": "first_name",
            "lastName": "last_name"
    },
    "email": "john.doe@example.com"
    "password": "xyz",
    "_id": "12345abcd"
  }
}
```

## /users/login Endpoint
## Description
Authenticate a user with valid credentials.

## HTTP Method
`POST`

## Endpoint
`/users/login`

## Request Body
- email (required, valid email)
- password (required, string, min length: 6)

## Success Response
- 200 OK: Returns a JSON with a token and user data.

## Error Response
- 400 Bad Request: Returns validation errors.
- 401 Unauthorized: Invalid credentials.

## Example Response
```json
{
  "token": "your_jwt_token_here",
  "user": {
    "fullName": {
      "firstName": "user_first_name",
      "lastName": "user_last_name"
    },
    "email": "user@example.com",
    "password": "xyz",
    "_id": "12345abcd"
  }
}
```

## /users/profile Endpoint

## Description
Get the authenticated user's profile information.

## HTTP Method
`GET`

## Endpoint
`/users/profile`

## Headers
- Authorization: Bearer {token}

## Success Response
- 200 OK: Returns user profile data.

## Error Response
- 401 Unauthorized: Invalid or missing token.

## Example Response
```json
{
  "user": {
    "fullName": {
      "firstName": "user_first_name",
      "lastName": "user_last_name"
    },
    "email": "user@example.com",
    "_id": "12345abcd"
  }
}
```

## /users/logout Endpoint

## Description
Logs out the current user by blacklisting their token.

## HTTP Method
`GET`

## Endpoint
`/users/logout`

## Headers
- Authorization: Bearer {token}

## Success Response
- 200 OK: User successfully logged out.

## Error Response
- 401 Unauthorized: Invalid or missing token.

## Example Response
```json
{
  "message": "Logged out successfully"
}
```

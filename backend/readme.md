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
    "_id": "677c1ff92cad2ccbf1b38b12"
  }
}
```

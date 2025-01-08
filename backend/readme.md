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

# Captain API Documentation

## /captains/register Endpoint

## Description
Registers a new captain with the provided information including vehicle details.

## HTTP Method
`POST`

## Endpoint
`/captains/register`

## Request Body
- fullName (object)
    - fullName.firstName (required, string, min length: 3)
    - fullName.lastName (string, min length: 3)
- email (required, valid email)
- password (required, string, min length: 5)
- vehicle (object)
    - vehicle.color (required, string, min length: 3)
    - vehicle.plate (required, string, min length: 3)
    - vehicle.capacity (required, integer, min: 1)
    - vehicle.vehicleType (required, enum: ['car', 'motorcycle', 'auto'])

## Example Request Data
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "secure123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

## Success Response
- 201 Created: Returns a JSON with a token and captain data.

## Error Response
- 400 Bad Request: Returns validation errors or if captain already exists.

## Example Response
```json
{
    "token": "your_jwt_token_here",
    "captain": {
        "fullName": {
            "firstName": "John",
            "lastName": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "12345abcd"
    }
}
```

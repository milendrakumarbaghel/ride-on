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
        "_id": "12345abcde"
    }
}
```

## /captains/login Endpoint

## Description
Authenticate a captain with valid credentials.

## HTTP Method
`POST`

## Endpoint
`/captains/login`

## Request Body
```json
{
    "email": "john.driver@example.com",     // required, valid email
    "password": "secure123"                 // required, min length: 5
}
```

## Success Response
- 200 OK: Returns a JSON with a token and captain data.

## Error Response
- 400 Bad Request: Returns validation errors
- 401 Unauthorized: Invalid credentials

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
        "_id": "12345abcde"
    }
}
```

## /captains/profile Endpoint

## Description
Get the authenticated captain's profile information.

## HTTP Method
`GET`

## Endpoint
`/captains/profile`

## Headers
- Authorization: Bearer {token}

## Success Response
- 200 OK: Returns captain profile data

## Error Response
- 401 Unauthorized: Invalid or missing token

## Example Response
```json
{
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
        "location": {                    // optional, present if captain has set location
            "lat": 12.9716,
            "lng": 77.5946
        },
        "_id": "12345abcde"
    }
}
```

## /captains/logout Endpoint

## Description
Logs out the current captain by blacklisting their token.

## HTTP Method
`GET`

## Endpoint
`/captains/logout`

## Headers
- Authorization: Bearer {token}

## Success Response
- 200 OK: Captain successfully logged out

## Error Response
- 401 Unauthorized: Invalid or missing token

## Example Response
```json
{
    "message": "Captain logged out successfully"
}
```

## /maps/get-coordinates Endpoint

## Description
Gets the geographic coordinates (latitude and longitude) for a given address.

## HTTP Method
`GET`

## Endpoint
`/maps/get-coordinates`

## Query Parameters
- `address` (required, string): The address to geocode.

## Success Response
- 200 OK: Returns the coordinates of the address.

## Error Response
- 400 Bad Request: Returns validation errors if the address is missing or invalid.
- 404 Not Found: If the coordinates cannot be found.

## Example Request
```
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

## Example Response
```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

## /maps/get-distance-time Endpoint

## Description
Calculates the distance and time between an origin and a destination.

## HTTP Method
`GET`

## Endpoint
`/maps/get-distance-time`

## Query Parameters
- `origin` (required, string): The starting location.
- `destination` (required, string): The ending location.

## Success Response
- 200 OK: Returns distance and time information.

## Error Response
- 400 Bad Request: Returns validation errors if origin or destination is missing or invalid.
- 500 Internal Server Error: If unable to fetch distance and time.

## Example Request
```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

## Example Response
```json
{
  "distance": {
    "text": "2,789 mi",
    "value": 4483592
  },
  "duration": {
    "text": "1 day 17 hours",
    "value": 150120
  },
  "status": "OK"
}
```

## /maps/get-suggestions Endpoint

## Description
Provides autocomplete suggestions for location inputs based on user input.

## HTTP Method
`GET`

## Endpoint
`/maps/get-suggestions`

## Query Parameters
- `input` (required, string): The partial input to autocomplete.

## Success Response
- 200 OK: Returns a list of suggestion predictions.

## Error Response
- 400 Bad Request: Returns validation errors if the input is missing or invalid.
- 500 Internal Server Error: If unable to fetch suggestions.

## Example Request
```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

## Example Response
```json
[
  {
    "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
    "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
    // other prediction fields
  },
  // more suggestions...
]
```

## /rides/create Endpoint

## Description
Creates a new ride request with the specified pickup, destination, and vehicle type.

## HTTP Method
`POST`

## Endpoint
`/rides/create-ride`

## Request Body
- `pickup` (required, string): The pickup location address.
- `destination` (required, string): The destination location address.
- `vehicleType` (required, string): Type of vehicle (`auto`, `motorcycle`, `car`).

## Success Response
- 201 Created: Returns the created ride object.

## Error Response
- 400 Bad Request: Returns validation errors if required fields are missing or invalid.
- 500 Internal Server Error: If internal server error occurs.

## Example Request
```json
{
  "pickup": "123 Main Street, New York, NY 10001",
  "destination": "456 Park Avenue, Los Angeles, CA 90012",
  "vehicleType": "car"
}
```

## Example Response
```json
{
  "user": "5f8f8c44b54764421b7156c1",
  "pickup": "123 Main Street, New York, NY 10001",
  "destination": "456 Park Avenue, Los Angeles, CA 90012",
  "fare": 600,
  "status": "pending",
  "otp": "123456",
  "_id": "5f8f8c44b54764421b7156c2"
}
```

## /rides/get-fare Endpoint

## Description
Returns a fare estimate for the specified pickup and destination.

## HTTP Method
GET

## Endpoint
/rides/get-fare

## Query Parameters
- pickup (required, string): The pickup location address
- destination (required, string): The destination location address

## Success Response
- 200 OK: Returns the fare estimate

## Error Response
- 400 Bad Request: Validation errors if parameters are missing or invalid
- 500 Internal Server Error: If there is a server-side error

## Example Request
GET /rides/get-fare?pickup=Central+Park&destination=Times+Square

## Example Response
```json
{
  "fare": 450
}
```

# Ride On Micro (Microservices Backend)

A microservices-based backend derived from the existing `backend` app. It splits the system into independent services and a simple API gateway.

## Services

- gateway (port 4000): API Gateway and reverse proxy for all services
- user-service (port 4001): User registration, login, profile, logout
- captain-service (port 4002): Captain registration, login, profile, logout
- maps-service (port 4003): Google Maps integrations (geocode, distance, autocomplete)
- ride-service (port 4004): Ride creation and lifecycle (fare, confirm, start, end)
- realtime-service (port 4010): WebSocket hub + REST emit API

All services use MongoDB and JWT. For simplicity, secrets are duplicated via env.

## Quick start (local)

1) Copy `.env.example` to `.env` at the root and update values.

2) Install and run each service (or use Docker):

Using Docker (recommended):

```bash
docker compose up --build
```

Manual:

```bash
# copy env for local runs (from repo root)
cp .env.example .env

# in each folder under ride_on_micro/ (gateway and every service)
npm i
npm run dev
```

Gateway: http://localhost:4000

## Env

See `.env.example` for all variables. When using Docker, the root `.env` is injected to all services. For manual runs, either export the variables in your shell before starting each service or place a copy of the same `.env` file inside each service folder.

## Endpoints (through gateway)

- POST /users/register, POST /users/login, GET /users/profile, GET /users/logout
- POST /captains/register, POST /captains/login, GET /captains/profile, GET /captains/logout
- GET /maps/geocode?address=..., GET /maps/distance?origin=...&destination=..., GET /maps/autocomplete?input=...
- POST /rides/create-ride, GET /rides/get-fare, POST /rides/confirm, GET /rides/start-ride, POST /rides/end-ride

## Notes

- The ride-service calls maps-service over HTTP to compute fares.
- Realtime events are handled by realtime-service (Socket.IO). Clients connect there and send a `join` event with their id/type.
- Geo queries are handled by captain-service (/captains-in-radius) using a 2dsphere index on captain.location (GeoJSON Point).
- ride-service delegates authentication by calling user-service/captain-service /profile with the provided bearer token; it does not validate JWTs locally.

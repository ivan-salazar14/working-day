# Colombian Business Date Calculator API

This API provides a service to calculate future dates and times by adding a specified number of business days and/or hours to a starting point, adhering to Colombian business rules.

## Features

- Calculate business dates by adding days
- Calculate business times by adding hours
- Combine days and hours in sequence
- Custom start date in UTC
- Skips weekends and Colombian holidays
- Business hours: 8:00 a.m. to 5:00 p.m. (excluding 12:00-1:00 p.m. lunch)
- Time zone: America/Bogota
- Automatic start time adjustment to nearest business time

## API Endpoint

### GET /api/calculate

Calculates the resulting UTC date after adding business days and/or hours.

#### Query Parameters

- `days` (optional, integer > 0): Number of business days to add
- `hours` (optional, integer > 0): Number of business hours to add
- `date` (optional, string): Start date in ISO 8601 UTC format with Z suffix (e.g., 2025-04-10T15:00:00Z). If not provided, uses current Colombia time.

#### Validations

- At least one of `days` or `hours` must be provided
- `days` and `hours` must be positive integers
- `date` must match the format: YYYY-MM-DDTHH:MM:SSZ (ISO 8601 UTC with Z suffix)
- Invalid date formats or values will return a 400 error

#### Response

```json
{
  "date": "2025-04-21T20:00:00Z"
}
```

#### Error Responses

```json
{
  "error": "InvalidParameters",
  "message": "At least one of days or hours must be provided"
}
```

```json
{
  "error": "InvalidParameters",
  "message": "Date must be in ISO 8601 UTC format with Z suffix"
}
```

```json
{
  "error": "InvalidParameters",
  "message": "Invalid date format"
}
```

```json
{
  "error": "ServiceUnavailable",
  "message": "Unable to fetch holidays data"
}
```

## Examples

### Add 5 business days from current time

GET /api/calculate?days=5

### Add 10 business hours from current time

GET /api/calculate?hours=10

### Add 2 days and 3 hours from current time

GET /api/calculate?days=2&hours=3

### Add 5 days from custom start date

GET /api/calculate?date=2025-04-10T15:00:00Z&days=5

### Add 8 business hours from 8:00 a.m. (same day result)

GET /api/calculate?date=2025-04-14T13:00:00Z&hours=8

Response: `{"date": "2025-04-14T22:00:00Z"}` (5:00 p.m. same day)

### Add 1 business hour from 5:00 p.m. (next day result)

GET /api/calculate?date=2025-09-19T22:00:00Z&hours=1

Response: `{"date": "2025-09-22T14:00:00Z"}` (9:00 a.m. next business day)

### Weekend adjustment example

GET /api/calculate?date=2025-04-12T19:00:00Z&hours=1

Response: `{"date": "2025-04-14T14:00:00Z"}` (Saturday adjusted to Friday 5:00 p.m., then next day)

## Business Rules

- Business days: Monday to Friday (skips weekends and holidays)
- Business hours: 8:00 a.m. to 5:00 p.m. (17:00)
- Excluded hours: 12:00 p.m. (lunch hour)
- Holidays: Dynamically fetched from external API
- Start time adjustment:
  - If before 8:00 a.m., adjusts to 8:00 a.m.
  - If at 12:00 p.m., adjusts to 1:00 p.m.
  - If after 5:00 p.m., adjusts to 5:00 p.m.
  - If on weekend or holiday, adjusts to previous business day at 5:00 p.m.
- Sequence: Business days added first, then business hours
- Result adjustment: If result is outside business hours after adding hours, adjusts to next business time

## Tech Stack

- TypeScript
- Express.js
- Luxon (date/time handling)
- Zod (request validation)
- Axios (HTTP client for holiday API)

## Running the API

1. Install dependencies: `npm install`
2. Development: `npm run dev` (runs with tsx for hot reload)
3. Build: `npm run build`
4. Start: `npm run start`

The server runs on port 3002 by default (configurable via PORT environment variable).

## Testing

Run tests with: `npm test`

The test suite includes:
- Integration tests for API endpoints
- Validation of business rules (weekends, holidays, business hours)
- Edge cases (start times outside business hours, end-of-day additions)
- Error handling scenarios

All tests use mocked holiday data and verify correct UTC date calculations.

## Postman Collection

Import the `postman_collection.json` file to test the API endpoints.
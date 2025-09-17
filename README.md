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

## API Endpoint

### GET /api/calculate

Calculates the resulting UTC date after adding business days and/or hours.

#### Query Parameters

- `days` (optional, integer > 0): Number of business days to add
- `hours` (optional, integer > 0): Number of business hours to add
- `date` (optional, string): Start date in ISO 8601 UTC format with Z suffix (e.g., 2025-04-10T15:00:00Z). If not provided, uses current Colombia time.

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

## Business Rules

- Business days: Monday to Friday
- Business hours: 8:00 a.m. to 5:00 p.m.
- Lunch break: 12:00 p.m. to 1:00 p.m.
- Holidays: Fetched from https://content.capta.co/Recruitment/WorkingDays.json
- Start time adjustment: If outside business hours, adjusts to nearest business time
- Sequence: Days added first, then hours

## Tech Stack

- TypeScript
- Express.js
- Luxon (date handling)
- Zod (validation)

## Running the API

1. Install dependencies: `npm install`
2. Development: `npm run dev` (runs with tsx for hot reload)
3. Build: `npm run build`
4. Start: `npm run start`

The server runs on port 3001 by default.

## Testing

Run tests with: `npm test`

Tests include integration tests for the API endpoints with various scenarios.

## Postman Collection

Import the `postman_collection.json` file to test the API endpoints.
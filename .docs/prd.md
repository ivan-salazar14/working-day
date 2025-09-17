# Colombian Business Date Calculator API

## 1. Title and Overview

### 1.1 Document Title & Version
Colombian Business Date Calculator API Product Requirements Document  
Version: 1.0  
Date: September 16, 2025

### 1.2 Product Summary
This API provides a service to calculate future dates and times by adding a specified number of business days and/or hours to a starting point, adhering to Colombian business rules. It accounts for national holidays, weekdays (Monday to Friday), business hours (8:00 a.m. to 5:00 p.m. local time, excluding 12:00 p.m. to 1:00 p.m. lunch), and time zone conversions. The starting point is either the current time in Colombia (America/Bogota) or a provided UTC date. The output is always in UTC ISO 8601 format. The API is designed for integration into applications needing accurate business timeline calculations, such as scheduling systems or financial tools.

### 1.3 Tech Stack Requirements
- Core Language: TypeScript with explicit typing for all functions, interfaces, data structures, inputs, outputs, and internal logic.
- Framework: vite, Zod with a REST framework like Express.js for handling HTTP requests.
- Date Handling: Use libraries such as Luxon or date-fns-tz for time zone conversions and date manipulations, ensuring no reliance on browser-specific features.
- Holidays Data: Fetch and integrate an array of Colombian national holidays from the provided resource: https://content.capta.co/Recruitment/WorkingDays.json. Implement caching or periodic refresh if needed for production.
- Deployment: Host on a serverless platform like Vercel, Railway, Render, or AWS Lambda (bonus for AWS CDK implementation).
- No additional databases required; all computations are in-memory.
- Must-have Integrations: None beyond the holidays JSON fetch.
- Constraints: No JavaScript; all code must be TypeScript. No external package installations beyond what's necessary for date handling and HTTP serving.

### 1.4 Implementation Considerations
- Phases: Start with MVP featuring the core GET endpoint, parameter validation, and business logic. Follow with full release including error handling, logging, and deployment.
- Scalability: Design for low-latency responses; cache holidays data to avoid repeated fetches.
- Security: Validate all inputs to prevent injection or overflow attacks; no authentication required as it's a public API, but consider rate limiting for abuse prevention.
- Performance: Ensure efficient date skipping for holidays and weekends; aim for O(n) complexity where n is the number of days to add.
- Applying Domain-Driven Design (DDD) and Hexagonal Architecture (Ports and Adapters) with Vite.js, a fast build tool for modern web projects, involves structuring your frontend application to separate concerns and enhance maintainability and testability.
Core Principles:
Domain Isolation: The central idea is to isolate your core business logic (the "domain") from external concerns like the UI (Vite.js/React/Vue) and data persistence. This makes the domain independent and testable.
Ports and Adapters:
Ports: Define interfaces in your domain that represent how the domain interacts with the outside world (e.g., UserRepositoryPort for data access, NotificationServicePort for sending notifications).
Adapters: Implement these ports, providing concrete implementations that connect to specific technologies (e.g., a HttpUserRepositoryAdapter for fetching data from an API, a ToastNotificationAdapter for displaying UI notifications).
Dependency Inversion: Dependencies flow inward, meaning your domain should not depend on infrastructure details. Instead, infrastructure adapters depend on domain ports.
Structuring Your Vite.js Project:
You can organize your project with a clear separation of layers:
src/domain: Contains your core business logic, entities, value objects, and domain services. This layer should have no dependencies on UI or infrastructure.
src/application: Defines application services and use cases that orchestrate interactions with the domain. These services might call domain services and interact with ports.
src/infrastructure: Houses the adapters that implement the ports defined in the domain. This includes things like API clients, state management solutions (e.g., Redux, Zustand), and UI-specific components that interact with the application layer.
src/presentation: Contains your UI components (React, Vue, etc.) that consume data from the application layer and trigger actions through it.
Vite.js Specifics:
Vite's fast development server and optimized build process complement this architecture well. You can leverage its module resolution to easily import and manage dependencies within your structured layers. TypeScript is highly recommended for defining clear interfaces (ports) and ensuring type safety across your layers.
Benefits:
Testability: Domain logic can be tested in isolation without needing a running UI or database.
Maintainability: Changes in UI or data storage technologies have minimal impact on the core business logic.
Scalability: Clear separation of concerns makes it easier to understand and extend the application as it grows.
Flexibility: Adapters can be swapped out easily to integrate with different external systems.

## 2. User Personas

### 2.1 Key User Types
- API Integrator: Developers or system administrators who integrate the API into their applications to compute business dates.
- End-User Application: Indirect users via integrated systems, such as business analysts or schedulers relying on accurate timelines.

### 2.2 Basic Persona Details
- API Integrator Persona:  
  Name: Alex Developer  
  Age: 28  
  Role: Software Engineer  
  Goals: Quickly integrate a reliable API for business date calculations without handling complex logic themselves.  
  Pain Points: Dealing with time zones, holidays, and edge cases manually; needs clear documentation and consistent responses.  
  Technical Proficiency: High; familiar with REST APIs, query parameters, and JSON handling.

### 2.3 Role-based Access
- Guest/User: All access is public with no authentication. Users can make GET requests to the endpoint with query parameters. Main features: Submit days/hours/date for calculation; receive UTC result or error messages. No restrictions or differentiated permissions.

## 3. User Stories

- ID: US-001  
  Title: Calculate Business Date with Days Parameter  
  Description: As an API integrator, I want to add a number of business days to the current or provided date, so that I can get the resulting UTC date accounting for weekends and holidays.  
  Acceptance Criteria:  
  - API accepts "days" as a positive integer query parameter.  
  - If no "date" provided, uses current Colombia time as start.  
  - Skips weekends (Sat-Sun) and holidays from the JSON resource.  
  - Adds days starting from the adjusted business start time.  
  - Returns {"date": "YYYY-MM-DDTHH:MM:SSZ"} in 200 OK.  
  - Testable via example: From a business day at 8:00 a.m., adding 1 day returns next business day at 8:00 a.m. in UTC.

- ID: US-002  
  Title: Calculate Business Date with Hours Parameter  
  Description: As an API integrator, I want to add a number of business hours to the current or provided date, so that I can get the resulting UTC time respecting business hours and lunch break.  
  Acceptance Criteria:  
  - API accepts "hours" as a positive integer query parameter.  
  - Computes within 8:00 a.m. - 5:00 p.m., excluding 12:00-1:00 p.m.  
  - Rolls over to next business day if hours exceed remaining in day.  
  - Adjusts start time backward to nearest business time if outside hours.  
  - Returns {"date": "YYYY-MM-DDTHH:MM:SSZ"} in 200 OK.  
  - Testable via example: From Friday 5:00 p.m., adding 1 hour returns Monday 9:00 a.m. in UTC.

- ID: US-003  
  Title: Calculate Business Date with Both Days and Hours  
  Description: As an API integrator, I want to add both days and hours in sequence, so that days are added first, then hours.  
  Acceptance Criteria:  
  - API processes "days" first, then "hours".  
  - Combines logic from US-001 and US-002.  
  - Handles holidays and business hours correctly in sequence.  
  - Returns {"date": "YYYY-MM-DDTHH:MM:SSZ"} in 200 OK.  
  - Testable via example: From Tuesday 3:00 p.m., adding 1 day and 4 hours returns Thursday 10:00 a.m. in UTC.

- ID: US-004  
  Title: Use Custom Start Date in UTC  
  Description: As an API integrator, I want to provide a start date in UTC, so that calculations begin from that point converted to Colombia time.  
  Acceptance Criteria:  
  - API accepts "date" in ISO 8601 UTC format with Z suffix.  
  - Converts to America/Bogota for business logic.  
  - Adjusts to nearest prior business time if invalid.  
  - Works with days, hours, or both.  
  - Returns result in UTC.  
  - Testable via example: With "date=2025-04-10T15:00:00Z", days=5, hours=4, skips holidays, returns "2025-04-21T20:00:00Z".

- ID: US-005  
  Title: Handle No Parameters Provided  
  Description: As an API integrator, I want an error if no days or hours are provided, so that invalid requests are rejected.  
  Acceptance Criteria:  
  - If neither "days" nor "hours" is present, returns 400 Bad Request.  
  - Response: {"error": "InvalidParameters", "message": "At least one of days or hours must be provided"}.  
  - Content-Type: application/json.  
  - Testable: GET without params returns exact error JSON.

- ID: US-006  
  Title: Validate Invalid Parameters  
  Description: As an API integrator, I want errors for invalid inputs, so that the API remains robust.  
  Acceptance Criteria:  
  - Rejects non-positive or non-integer "days"/"hours".  
  - Rejects invalid "date" formats (not ISO 8601 UTC with Z).  
  - Returns 400 with {"error": "InvalidParameters", "message": "Specific detail"}.  
  - Testable: "days=-1" returns error; "date=invalid" returns error.

- ID: US-007  
  Title: Adjust Start Time Outside Business Hours  
  Description: As an API integrator, I want the start time adjusted backward to the nearest business time if outside hours or non-business day.  
  Acceptance Criteria:  
  - For start on weekend/holiday, moves to previous Friday 5:00 p.m. or appropriate.  
  - For after 5:00 p.m., adjusts to 5:00 p.m. same day.  
  - For before 8:00 a.m., adjusts to 8:00 a.m. same day if business day.  
  - During lunch, treats as non-business hour.  
  - Testable via example: From Saturday 2:00 p.m., adding 1 hour returns Monday 9:00 a.m. in UTC.

- ID: US-008  
  Title: Handle Lunch Break in Hour Calculations  
  Description: As an API integrator, I want hours to skip the lunch break, so that effective business hours are 8 (8-12, 1-5).  
  Acceptance Criteria:  
  - Adding hours skips 12:00-1:00 p.m.  
  - If addition crosses lunch, continues after 1:00 p.m.  
  - Testable: From 11:30 a.m., adding 1 hour returns 1:30 p.m. (skips lunch).

- ID: US-009  
  Title: Skip Holidays in Day Additions  
  Description: As an API integrator, I want days to skip Colombian holidays, so that only true business days are counted.  
  Acceptance Criteria:  
  - Uses holidays from https://content.capta.co/Recruitment/WorkingDays.json.  
  - Adds extra days if target lands on holiday.  
  - Testable via example: Adding days that cross known holidays skips them.

- ID: US-010  
  Title: Preserve Start Time When Adding Days  
  Description: As an API integrator, I want the time of day preserved when adding days, unless adjusted for business rules.  
  Acceptance Criteria:  
  - For days only, end time matches adjusted start time.  
  - Testable: From 12:30 p.m., adding 1 day returns next business day 12:00 p.m. (adjusts for lunch? Wait, per example 7: to 12:00 p.m.).

- ID: US-011  
  Title: Handle Edge Case: Adding Zero Days/Hours  
  Description: As an API integrator, I want zero additions to return the adjusted start date in UTC, but since positive required, handle as invalid if zero.  
  Acceptance Criteria:  
  - Per rules, positive integers; zero triggers invalid parameter error.  
  - Testable: "days=0" returns 400 error.

- ID: US-012  
  Title: Handle Large Additions Efficiently  
  Description: As an API integrator, I want the API to handle large days/hours without performance issues.  
  Acceptance Criteria:  
  - Processes additions like days=1000 efficiently.  
  - No timeouts; response under 1 second.  
  - Testable: Simulate large input and check response time.

- ID: US-013  
  Title: Error on Service Unavailability  
  Description: As an API integrator, I want errors if holidays data can't be fetched.  
  Acceptance Criteria:  
  - If JSON fetch fails, returns 503 Service Unavailable with {"error": "ServiceUnavailable", "message": "Unable to fetch holidays data"}.  
  - Testable: Mock fetch failure and verify response.

- ID: US-014  
  Title: Secure API Access  
  Description: As an API integrator, I want the API to be accessible securely over HTTPS, with no authentication but protection against abuse.  
  Acceptance Criteria:  
  - Deployment uses HTTPS.  
  - Optional rate limiting (e.g., 100 requests/min per IP).  
  - Validates query strings to prevent injection.  
  - Testable: Access via HTTP redirects to HTTPS; excessive requests throttled.
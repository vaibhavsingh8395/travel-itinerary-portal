# Travel Itinerary Portal

An enterprise integration bridge for processing, categorizing, and delivering custom travel itineraries to users. Built with JavaScript, Node.js tooling, and serverless PostgreSQL database architectures.

## Repository Architecture & Standards
- **`js/itinerary-mapping.js`**: Core business logic unit for parsing preferences and normalizing trip payloads.
- **`js/app-demo.js`**: Repository pattern abstraction layer for running offline mock environments in `localStorage`.
- **`supabase/schema.sql`**: Database schema enforcing Row-Level Security (RLS) policies between users and administrators.
- **`supabase/functions/send-itinerary-email/index.ts`**: TypeScript Edge Function for dispatching notification emails upon status state changes.

## Quickstart
1. Clone the repository:
   ```bash
   git clone [https://github.com/vaibhavsingh8395/travel-itinerary-portal.git](https://github.com/vaibhavsingh8395/travel-itinerary-portal.git)

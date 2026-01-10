# TrackHire — Backend

This is the backend API for **TrackHire**, responsible for authentication, authorization, and managing job applications.

---

## Tech Stack

- Node.js
- Express
- TypeScript
- JWT
- bcrypt
- Zod
- Prisma ORM
- PostgreSQL (Supabase)

---

## Responsibilities

The backend handles:

- User authentication (register & login)
- JWT-based authorization
- CRUD operations for applications
- Input validation
- Database access

---

## Folder Structure

```text
src/
├── controllers/   # Request handlers
├── routes/        # API routes
├── middlewares/   # Auth & error handling
├── utils/         # Helper functions
├── app.ts         # Express app setup
└── server.ts      # Server bootstrap
```

## Authentication
- JWT is used for stateless authentication
- Tokens are validated via middleware
- Protected routes require a valid Bearer token

## Validation
- Zod is used to validate request bodies and parameters
- Prevents invalid data from reaching controllers

## Database & Prisma

### Prisma Configuration
For the MVP, Prisma is configured directly via schema.prisma using environment variables.

If the project evolves into a monorepo or requires advanced configuration, `prisma.config.ts` can be introduced.

Initially, Prisma 7 was tested, but it requires `prisma.config.ts`, which adds unnecessary complexity for an MVP.

Therefore, Prisma 6 was chosen for its stability and simpler setup.

## Environment Variables

### Example:

```text
DATABASE_URL=
JWT_SECRET=
PORT=
```

### Running Locally

```text
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```


### The API will be available at:

```text
http://localhost:3333
```

## Notes
- The backend uses CommonJS + ES2020 for maximum Node compatibility
- REST API architecture was chosen for simplicity and clarity
- Error handling is centralized via middlewares
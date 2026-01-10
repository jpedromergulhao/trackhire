# TrackHire

TrackHire is a platform that helps users **organize and track their job applications** in a clear and objective way.

The goal is to solve a very common problem:

> “I applied for many jobs and no longer know where I am in each hiring process.”

With TrackHire, users can manage applications, track statuses, technical stages, and keep all relevant information in one place.


## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Context API
- Fetch API

### Backend
- Node.js
- Express
- TypeScript
- JWT (Authentication)
- bcrypt (Password hashing)
- Zod (Request validation)
- Prisma ORM

### Database
- PostgreSQL (Supabase)

### Deploy
- Frontend: Vercel
- Backend: Render
- Database: Supabase


## Project Structure

```text
trackhire/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   └── wrappers/
│   ├── next.config.js
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   ├── package.json
│   └── README.md
│
└── README.md
```

## Architectural Decisions
- Backend and frontend in the same repository, a monorepo, to speed up the development process.
- Next.js App Router was chosen for better routing, layouts, and scalability.
- REST API architecture for simplicity and clarity.
- JWT-based authentication, keeping the backend stateless.
- Prisma ORM for type safety and predictable database access.
- Since this is a simpler project, I decided to use only the Context API to manage state globally. But if the project were to expand further, I would use Redux.


## Local Development
### To run the project locally:
- Start the backend
- Start the frontend

⚠️ Important: Go to frontend/src/helpers/url.ts and change the API base URL from the production URL to LOCAL_URL.

## Future Improvements
- OAuth authentication (Google, LinkedIn)
- User profile modal
- Pagination and advanced filters for applications
- Mobile-first UI refinements

**NOTE:** The profile model was intentionally not implemented to avoid further delays in project delivery.
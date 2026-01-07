# TrackHire

This is a platform where **users can organize**, in a simple and objective way, **the job openings they have applied for**. TrackHire is here to solve the problem "I applied for several jobs and I no longer know where I am in each process."

--

## Tech Stack

### Frontend
    • Next.js (App Router)
    • TypeScript
    • Tailwind CSS
    • Shadcn/ui
    • Context API
    • Fetch API

### Backend
    • Node.js
    • Express
    • TypeScript
    • JWT
    • bcrypt
    • Zod (validação)
    • Prisma

### Database
    • PostgreSQL (Supabase)

### Database
    • Frontend: Vercel
    • Backend: Render
    • DB: Supabase 

--

## Architectural decisions

**• Next.js :** 


## Project Structure 

```text
trackhire/
 ├── frontend/
 │   ├── app/
 │   ├── components/
 │   ├── lib/
 │   ├── context/
 │   ├── services/
 │   ├── styles/
 │   ├── next.config.js
 │   ├── tailwind.config.js
 │   └── README.md
 │
 ├── backend/
 │   ├── src/
 │   │   ├── controllers/
 │   │   ├── routes/
 │   │   ├── middlewares/
 │   │   ├── services/
 │   │   ├── utils/
 │   │   ├── app.ts
 │   │   └── server.ts
 │   ├── prisma/
 │   ├── package.json
 │   └── README.md
 │
 └── README.md
```

-- 


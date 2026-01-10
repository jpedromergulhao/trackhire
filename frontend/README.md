# TrackHire — Frontend

This is the frontend application for **TrackHire**, built with **Next.js (App Router)** and focused on a clean, responsive, and intuitive user experience.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Context API
- Fetch API

---

## Responsibilities

The frontend is responsible for:

- Authentication flow (login / register)
- Protected routes
- Application CRUD (create, edit, delete)
- Status and technical stage visualization
- UI state management (alerts, loading states, modals)

---

## Folder Structure

```text
src/
├── app/          # App Router pages and layouts
├── components/   # Reusable UI components
├── context/      # Global contexts (Auth, Loading)
├── helpers/      # Helpers (API URLs, utils)
├── hooks/        # Custom hooks (applications, auth)
├── lib/          # Shared libraries and configs
├── providers/    # App-level providers
└── wrappers/     # Layout and route wrappers
```

## State Management
- Context API is used for:
    - Authentication
    - Global loading state
    - Alerts and notifications

This approach avoids unnecessary complexity while keeping the app predictable.

## Styling
- Tailwind CSS for utility-first styling
- shadcn/ui for accessible, composable components
- Custom styles applied only when necessary

## Environment Configuration

The API base URL is defined in: 

```text
frontend/src/helpers/url.ts
```

Change the value to **LOCAL_URL** when running the backend locally.

## Running Locally

```text
npm install
npm run dev
```

The app will be available at:

```text
http://localhost:3000
```

## Notes
- The frontend uses ESM
- Modals are controlled via state and follow accessibility best practices
- Forms are fully controlled and validated before submission
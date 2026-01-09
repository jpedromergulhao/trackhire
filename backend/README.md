# Architectural Decisions

## Prisma configuration
For the MVP, Prisma is configured directly via `schema.prisma` using environment variables. If the project evolves into a monorepo or requires advanced configuration, `prisma.config.ts` will be introduced. Initially, I tested Prisma 7, but it requires `prisma.config.ts`, which adds unnecessary complexity for an MVP. I opted to use **Prisma 6**, which is widely adopted in production and allows for a simpler and clearer configuration.

I used CommonJS and ES2020 to maintain maximum compatibility with Node and avoid unnecessary friction with backend tooling. For the frontend, I use ESM.

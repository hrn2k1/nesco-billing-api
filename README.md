# TypeScript Express Backend API Blueprint

This project is a high-performance, strictly typed REST API utilizing Node.js, Express, PostgreSQL, Prisma ORM, and TSOA.

> 🤖 **Copilot Context:** Always adhere to the Code-First, Decorator-Driven architecture defined below when generating new features, controllers, or models.

---

## 🏛️ Architecture & Coding Patterns

### 1. Code-First API Layer (`tsoa`)
* **No Manual Routing:** All endpoints must be created inside classes extending `tsoa`'s `Controller`.
* **Decorators:** Use `@Route()`, `@Get()`, `@Post()`, `@Body()`, `@Path()`, and `@Tags()` to define API paths and parameters.
* **Documentation:** `tsoa` automatically compiles these controllers into a `swagger.json` and a generated routes file.

### 2. Single Source of Truth Entity Layer (`Prisma`)
* Database entities are strictly managed via `prisma/schema.prisma`.
* Database migrations are executed using `npx prisma migrate dev` (development) and `npx prisma migrate deploy` (production).
* Always import structural types directly from `@prisma/client`.

### 3. Layered Separation of Concerns
Every resource folder or module must contain:
1. **Controller (`*Controller.ts`)**: TSOA decorators, manages HTTP input validation and response statuses. No direct database access.
2. **Service (`*Service.ts`)**: Contains core application business logic and data formatting.
3. **Repository (`*Repository.ts`)**: Dedicated completely to Prisma Client database operations (`prisma.user.findUnique`, etc.).

---

## 📁 Recommended Folder Layout

```text
src/
├── config/             # Database and server infrastructure setups
├── controllers/        # TSOA decorator-driven controllers
├── services/           # Core business logic processing
├── repositories/       # Database query abstraction (Prisma)
└── app.ts              # Express initialization and TSOA route loading

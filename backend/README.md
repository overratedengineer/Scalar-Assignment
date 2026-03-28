# Flipkart Clone Backend

This repository contains the backend implementation for a functional e-commerce web application, built as a replication of the core features of Flipkart.

## Technical Stack
- **Framework**: Node.js & Express.js
- **Database ORM**: Prisma
- **Database**: PostgreSQL (currently initialized to locally use SQLite for rapid development testing out-of-the-box).
- **Other Packages**: `cors`, `helmet` (security headers), `morgan` (logging), `express-rate-limit` (DDoS protection), and `bcryptjs`.

## Prerequisites
Before running the application, ensure you have installed:
- [Node.js](https://nodejs.org/) (v16.x or newer)
- npm (Node Package Manager)

## Setup & Run Instructions

**1. Clone or Open the Directory**
Navigate into the `flipkart-backend` root folder in your terminal:
```bash
cd flipkart-backend
```

**2. Install Dependencies**
```bash
npm install
```

**3. Initialize Environment Variables**
A `.env` file should already be present. If it's missing, you can create one (or rename `.env.example`) and add the following:
```env
# Currently defaults to SQLite for testing without installing PostgreSQL
DATABASE_URL="file:./dev.db" 
PORT=8000
```

**4. Generate Database Tables and Seed Data**
Sync the Prisma schema to the database and seed the initial mock products & categories:
```bash
npm run db:migrate
npm run db:seed
```

**5. Start the Server**
Run the backend API using the `dev` script. This spins up the app using `nodemon` so it restarts automatically on any code changes:
```bash
npm run dev
```

The server will be running at `http://localhost:8000`.

## Postman Collection
To make endpoint testing simple, a file `Flipkart_Clone.postman_collection.json` has been provided in the root directory. You can import this directly into Postman to review all paths, query parameters, and JSON payloads (such as placing an order or editing cart quantities).

## Assumptions Made
1. **Database Fallback:** As per the instructions, the database schema (Prisma) has been structured specifically for standard relational DBs like **PostgreSQL** or **MySQL**. To make running the project as frictionless as possible (without requiring a local Postgres database to be running locally on your evaluator's machine), the actual implementation natively uses **SQLite** through Prisma locally via (`file:./dev.db`). The switch merely involves changing the provider back to `"postgresql"` in the `schema.prisma` file if true postgres testing is required. I've also included a `docker-compose.yml` for Postgres.
2. **Authentication Flow:** As requested by the instructions ("Assume a default user is logged in, No login required"), standard JWT/Session configurations were skipped. The backend automatically injects a verified and seeded user (`demo@flipkart.com`) ID for all Cart and Order routes using middleware.
3. **Cart & Shipping Checkouts:** We assume one order equates to pulling all active items straight from the logged-in user's cart, tallying the total, generating the receipt arrays, and immediately cleaning their cart table natively via a database transaction.

# 🛒 Fullstack Flipkart Clone

A beautifully dynamic, feature-rich E-commerce web application meticulously designed and modelled after the Flipkart ecosystem! Built with a modern tech stack encompassing React, Vite, Express.js, PostgreSQL, and Prisma.

## 🚀 Tech Stack

- **Frontend**: React.js, TypeScript, Vite, TailwindCSS (Responsive mobile/desktop layouts)
- **Backend**: Node.js, Express.js, Express-Rate-Limit, JSON Web Tokens (JWT) Auth
- **Database**: PostgreSQL controlled strictly via Prisma ORM

## 📂 Repository Structure

This is a comprehensive monorepo structuring both the core API system alongside the visual web application.
- `/frontend`: The interactive client application.
- `/backend`: The RESTful API resolving data securely.

## 🛠 Installation & Setup

To boot this application locally, you will need two separate terminal windows for both the frontend and backend.

### 1. Database & Backend Configuration
1. Travel to the backend: `cd backend`
2. Install dependencies: `npm install`
3. Create your `.env` configuration file inside `backend/`:
   ```env
   PORT=8001
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="secure_random_production_string"
   FRONTEND_URL="http://localhost:5173"
   ```
4. Push your schema structural data: `npx prisma db push`
5. *(Optional)* Seed developer mockup data (14 categories & products): `node prisma/seed.js`
6. Boot the backend server: `npm run dev`

### 2. Frontend Configuration
1. Travel to the frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Create an `.env` configuration file inside `frontend/`:
   ```env
   VITE_API_BASE_URL="http://localhost:8001/api"
   ```
4. Launch the application: `npm run dev`

### ✨ Key Application Features:
- Fully restricted Authenticated / Guest session cart validations.
- Stateful Wishlist component dynamically mapped to PostgreSQL relational tables.
- Hardened Backend security leveraging express-rate-limiting to prevent brute force DDOS.
- Dynamic responsive architecture suitable for Desktop, Tablet, and Mobile views.

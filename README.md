# Nexus Commerce 🛒

A scalable, modern full-stack e-commerce ecosystem built for high performance, deep relational data management, and a seamless user experience. Nexus Commerce bridges the gap between premium customer shopping experiences and institutional-grade merchant operations.

## 🚀 Overview & Features

Nexus Commerce is a fully deployed, multi-role platform (Customer, Merchant, Admin) featuring razor-sharp precision in financial tracking and inventory management.

### Core Capabilities

- **Role-Based Access Control:** Distinct experiences for standard Customers, verified Merchants, and System Admins.
- **Merchant Operations Hub:** A dedicated dashboard for sellers to track YTD revenue, monthly peaks, active inventory, and dynamic payout ledgers.
- **Advanced Authentication:** Secure JWT-based credentials using HTTP-only/SameSite cookies, alongside frictionless **Google OAuth** (SSO) integration.
- **Algorithmic Database Seeding:** A custom Node.js/Faker.js engine capable of generating hundreds of perfectly linked products, simulating thousands of purchases, and calculating complex financial mathematics for merchant analytics in seconds.
- **Optimized UX/UI:** Graceful server cold-start handling (`HydrateFallback`), complex product carousels, responsive shopping carts, and dynamic review systems.

## 💻 Tech Stack

**Frontend (Client):**

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7 (Data Loaders, Actions, and HydrateFallback)
- Google OAuth (`@react-oauth/google`)
- Axios (with response interceptors for auth guarding)

**Backend (API):**

- Node.js (v18+) & Express.js v5
- MongoDB (Mongoose)
- Redis (Caching) & Node-Cron (Background Tasks)
- JWT & bcrypt (Security)
- Multer & Cloudinary (Cloud Media Storage)

## 🌍 Deployment Architecture

- **Frontend:** Hosted on Netlify (Static Site).
- **Backend:** Hosted on Render (Web Service).

## 📁 Repository Structure

- `/Frontend` - The React client application.
- `/Backend` - The REST API, Database schemas, and Data Seeding scripts.

---

_Built by Sarath Dharmaraj_

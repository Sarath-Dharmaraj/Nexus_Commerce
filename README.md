# Nexus Commerce 🛒

A scalable, modern full-stack e-commerce platform built for high performance and seamless user experience. Nexus Commerce is designed to bridge the gap between premium customer shopping experiences and robust merchant operations.

## 🚀 Project Status

_Active Development_

The platform's foundational architecture, secure authentication, and complex profile state management are complete. Development is currently focused on building out the Merchant Operations Dashboard.

### ✅ Completed Features

- **Authentication Pipeline:** Secure JWT-based Sign Up and Sign In flows with cookie parsing.
- **Advanced Profile Management:** \* Global state management using React Context (`profileContext`).
  - Dynamic Cloudinary integration for profile avatar uploads.
  - CRUD operations for User Addresses (primary toggling).
  - CRUD operations for Payment Methods/Cards (default toggling).
  - Recent Order history UI.
- **Modern Routing:** Implemented React Router v7 data APIs (Loaders and Actions) for seamless data fetching and form submissions before component rendering.

### 🚧 Currently Working On

- **Seller Console (Merchant Dashboard):** Inventory tracking, wallet management, and order fulfillment interface.

### 📅 Upcoming Features

- Dynamic Home Page & Product Storefront
- Advanced Sorting & Category Filtering
- Persistent Shopping Cart
- Customer Support & Ticketing System

## 💻 Tech Stack

**Frontend:**

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7 (Data Routers)
- Axios (with response interceptors for auth guarding)

**Backend:**

- Node.js & Express.js
- MongoDB (Mongoose)
- JWT & bcrypt (Security)
- Multer & Cloudinary (Media Storage)

## 📁 Repository Structure

- [`/Frontend`](./Frontend) - Client-side application
- [`/Backend`](./Backend) - REST API and Database models

---

_Built by Sarath D._

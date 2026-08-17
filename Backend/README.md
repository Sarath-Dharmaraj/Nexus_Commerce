# Nexus Commerce - API Backend

The RESTful API service powering Nexus Commerce. It handles highly relational database modeling, secure authentication, financial data calculations, and direct-to-cloud media storage.

## 🛠️ Architecture & Technologies

- **Runtime Framework:** Node.js (>=18.0.0) with Express v5.
- **Database:** MongoDB integrated via Mongoose.
- **Performance:** Redis for high-speed data caching and `node-cron` for automated scheduling tasks.
- **Security:** JWT (JSON Web Tokens) stored in strict HTTP-only, environment-aware SameSite cookies. Password hashing via `bcrypt`.
- **Media Handling:** `multer` and `multer-storage-cloudinary` for secure image uploads.
- **Ecosystem Generation:** Contains a powerful `faker.js` seeding script to instantly populate the database with merchants, products, and interconnected order/review histories.

## 📁 Directory Structure

- `/controllers` - Core business logic for auth, products, orders, and merchant analytics.
- `/middleware` - JWT verification, secure cookie validation, and Cloudinary upload config.
- `/model` - Mongoose schemas (e.g., highly nested `User` schema handling roles, addresses, and merchant ledgers).
- `/routers` - API route definitions mapping to controllers.
- `/utilit` - Helper functions, Cron jobs, Redis configs, and the Database Seeding engine.

## 🚀 Getting Started

### Prerequisites

You need a `.env` file at the root of the `/Backend` directory containing the following:

PORT=5001
MONGO_DB_URL=your_mongodb_connection_string
IS_PRODUCTION=false
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
REDIS_URL=your_redis_connection_url

### Installation & Execution

1. Navigate to the backend directory:
   cd Backend

2. Install dependencies (using pnpm):
   pnpm install

3. (Optional) Seed the Database:
   To instantly populate the database with realistic merchants, products, and financial histories:
   node seedDB.js

4. Start the server:
   pnpm start

   # OR

   node index.js

   The server will start on port 5001 (or the port defined in your `.env`).

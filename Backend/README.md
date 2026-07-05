# Nexus Commerce - API Backend

The RESTful API service powering Nexus Commerce. It handles secure user authentication, database modeling, and media storage integration.

## 🛠️ Architecture & Technologies

- **Runtime Framework:** Node.js with Express v5.
- **Database:** MongoDB integrated via Mongoose.
- **Security:** JWT (JSON Web Tokens) stored in HTTP-only cookies, password hashing via `bcrypt`.
- **Media Handling:** `multer` and `multer-storage-cloudinary` for direct-to-cloud profile image uploads.

## 📁 Directory Structure

- `/controllers` - Business logic (`authController.js`, `userController.js`).
- `/middleware` - JWT verification (`gaurdAuth.js`), secure cookie setting, and Cloudinary upload config.
- `/model` - Mongoose schemas (e.g., highly nested `User` schema handling roles, addresses, cards, and seller profiles).
- `/routers` - API route definitions mapping to controllers.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally on `mongodb://localhost:27017/nexus_commerce`
- A `.env` file at the root of the backend directory containing your Cloudinary and JWT secrets:
  ```env
  PORT=5001
  JSONWEBTOKEN_SECRET_KEY=your_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```

### Installation & Execution

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies (using pnpm as per the workspace):
    ```bash
    pnpm install
    ```
3.  Start the server. (Note: This project does not utilize a `dev` script in `package.json`):

    ```bash
    # For standard execution
    node index.js

    # OR, if you have nodemon installed globally for hot-reloading
    nodemon index.js
    ```

    The server will start on port `5001` (or the port defined in your `.env`).

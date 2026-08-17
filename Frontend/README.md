# Nexus Commerce - Frontend Client

The user interface for Nexus Commerce, built for speed, deep responsiveness, and institutional-grade aesthetics using the absolute latest React ecosystem tools.

## 🛠️ Architecture & Technologies

- **Core:** React 19 bootstrapped with Vite.
- **Styling:** Tailwind CSS v4 utilizing the new `@tailwindcss/vite` plugin for lightning-fast compilation and strict class enforcement.
- **Routing:** React Router v7. This project heavily utilizes the new Data Router paradigms (`loader`, `action`, `HydrateFallback`) to handle API calls, form submissions, and server cold-start delays directly within the routing layer.
- **Authentication:** Traditional credential flows combined with `GoogleLogin` (Google OAuth) for frictionless SSO.
- **API Client:** Axios configured with global interceptors and `withCredentials: true` to seamlessly pass secure HTTP-only cookies to the backend.

## 📁 Directory Structure

- `/src/api` - Configured Axios instances mapped to environment variables.
- `/src/components` - Reusable UI components categorized by feature (e.g., Product Cards, Star Ratings, Modals).
- `/src/context` - Global state providers managing complex UI states.
- `/src/layouts` - Nested routing wrappers protecting authenticated and role-specific content.
- `/src/pages` - Top-level route components (`Home`, `Login`, `ProductCard`, `Merchant`, `Checkout`).
- `/src/services` - Centralized router actions and loaders for data fetching/mutations.

## 🚀 Getting Started

### Prerequisites

You need a `.env` file at the root of the `/Frontend` directory containing the following:

VITE_API=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id

### Installation & Execution

1. Navigate to the frontend directory:
   cd Frontend

2. Install dependencies:
   pnpm install

3. Start the Vite development server:
   pnpm run dev

   The client will be available at http://localhost:5173. Ensure the backend is running concurrently for full functionality.

### 🌐 Deployment Notes

When deploying to platforms like Netlify, ensure the `_redirects` file is present in the `/public` directory to handle React Router's client-side routing:

/\* /index.html 200

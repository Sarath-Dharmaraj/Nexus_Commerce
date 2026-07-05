# Nexus Commerce - Frontend Client

The user interface for Nexus Commerce, built for speed and responsiveness using the latest React ecosystem tools.

## 🛠️ Architecture & Technologies

- **Core:** React 19 bootstrapped with Vite.
- **Styling:** Tailwind CSS v4 utilizing the new `@tailwindcss/vite` plugin for lightning-fast compilation.
- **Routing:** React Router v7. This project heavily utilizes the new Data Router paradigms (`loader`, `action`, `useActionData`, `useRevalidator`) in `routerAction.jsx` and `routerLoader.jsx` to handle API calls and mutations directly within the routing layer.
- **State Management:** Context API (`profileContext.jsx`) managing complex UI states (modals, active tabs, selected items for editing).
- **API Client:** Axios configured with global interceptors to automatically handle 401/403 unauthorized responses and redirect to login.

## 📁 Directory Structure

- `/src/api` - Configured Axios instances.
- `/src/components` - Reusable UI components categorized by feature (e.g., `/profileComp`, `/merchComp`).
- `/src/context` - Global state providers.
- `/src/pages` - Top-level route components (`Home`, `Login`, `Signup`, `Profile`, `Merchant`).
- `/src/services` - Router actions and loaders for data fetching/mutations.

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation & Execution

1.  Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the Vite development server:
    ```bash
    pnpm run dev
    ```
    The client will be available at `http://localhost:5173`. Ensure the backend is running concurrently for full functionality.

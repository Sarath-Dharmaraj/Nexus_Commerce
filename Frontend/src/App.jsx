import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedLayout from "./components/ProtectedLayout";

import {
  signupAction,
  loginAction,
  profileAction,
} from "./services/routerAction";
import { gatewayLoader, ProtectedLoader } from "./services/routerLoader";
import { AuthProvider } from "./context/globalAuth";

function App() {
  const router = createBrowserRouter([
    {
      loader: gatewayLoader,
      path: "/",
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "/signup",
      element: <Signup />,
      action: signupAction,
    },
    {
      id: ProtectedLayout,
      element: <ProtectedLayout />,
      loader: ProtectedLoader,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
          action: profileAction,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { signupAction, loginAction } from "./services/routerAction";
import { gatewayLoader } from "./services/routerLoader";

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
      path: "/home",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

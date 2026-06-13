import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { signupAction } from "./services/signupAction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/signup" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
      action: signupAction,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

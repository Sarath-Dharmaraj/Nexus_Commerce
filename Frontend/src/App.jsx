import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedLayout from "./components/protectedPageComp/ProtectedLayout";
import Merchant from "./pages/Merchant";
import ProductCard from "./pages/ProductCard";

import {
  signupAction,
  loginAction,
  profileAction,
  merchantAction,
} from "./services/routerAction";
import {
  gatewayLoader,
  ProtectedLoader,
  merchantLoader,
  homeFeedLoader,
  productLoader,
} from "./services/routerLoader";

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
      id: "ProtectedLayout",
      element: <ProtectedLayout />,
      loader: ProtectedLoader,
      children: [
        {
          path: "/home",
          element: <Home />,
          loader: homeFeedLoader,
        },
        {
          path: "/profile",
          element: <Profile />,
          action: profileAction,
        },
        {
          path: "/product/:productId",
          loader: productLoader,
          element: <ProductCard />,
        },
      ],
    },
    {
      path: "/merchant",
      element: <Merchant />,
      loader: merchantLoader,
      action: merchantAction,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedLayout from "../layouts/ProtectedLayout";
import RootLayout from "../layouts/RootLayout";
import Merchant from "./pages/Merchant";
import ProductCard from "./pages/ProductCard";

import {
  signupAction,
  loginAction,
  profileAction,
  merchantAction,
  productAction,
  slideAction,
} from "./services/routerAction";
import {
  gatewayLoader,
  profileLoader,
  merchantLoader,
  homeFeedLoader,
  productLoader,
  wishlistLoader,
  cartLoader,
} from "./services/routerLoader";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: gatewayLoader,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
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
          children: [
            {
              path: "/home",
              element: <Home />,
              loader: homeFeedLoader,
              action: slideAction,
            },
            {
              path: "/profile",
              element: <Profile />,
              loader: profileLoader,
              action: profileAction,
            },
            {
              path: "/product/:productId",
              loader: productLoader,
              action: productAction,
              element: <ProductCard />,
            },
            {
              path: "/wishlist",
              element: <Wishlist />,
              loader: wishlistLoader,
              action: slideAction,
            },
            {
              path: "/cart",
              element: <Cart />,
              action: slideAction,
              loader: cartLoader,
            },
          ],
        },
        {
          path: "/merchant",
          element: <Merchant />,
          loader: merchantLoader,
          action: merchantAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

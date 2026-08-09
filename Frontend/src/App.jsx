import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedLayout from "./layouts/ProtectedLayout";
import RootLayout from "./layouts/RootLayout";
import Merchant from "./pages/Merchant";
import ProductCard from "./pages/ProductCard";

import {
  signupAction,
  loginAction,
  profileAction,
  merchantAction,
  productAction,
  slideAction,
  orderAction,
  settingsAction,
} from "./services/routerAction";
import {
  gatewayLoader,
  profileLoader,
  merchantLoader,
  homeFeedLoader,
  productLoader,
  wishlistLoader,
  cartLoader,
  checkoutLoader,
  paymentLoader,
} from "./services/routerLoader";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import CheckoutLayout from "./layouts/CheckoutLayout";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";

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
            {
              path: "/settings",
              element: <Settings />,
              loader: profileLoader,
              action: settingsAction,
            },
          ],
        },
        {
          id: "CheckoutLayout",
          element: <CheckoutLayout />,
          loader: cartLoader,
          children: [
            {
              path: "/checkout",
              element: <Checkout />,
              loader: checkoutLoader,
            },
            {
              path: "/checkout/payment",
              element: <Payment />,
              loader: paymentLoader,
              action: orderAction,
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

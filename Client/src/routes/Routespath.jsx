import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Home,
  Collections,
  Categories,
  ProductDetails,
  Bag,
  Checkout,
  Account,
  Orders,
  OrderId,
  SavedItems,
  Profile,
  Shoporders,
  Manageproduct,
  CreateProduct,
  Search,
} from "../pages";
import {Root, Error} from "../components";
import ProtectedRoutes from "./ProtectedRoutes";
impo

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "collections",
          element: <Collections />,
          children: [
            {
              path: ":collectionName",
              element: <Categories />,
            },
            {
              path: ":collectionName/:slug",
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "bag",
          element: <Bag />,
        },

        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "account",

          element: (
            <ProtectedRoutes>
              <Account />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: ":username/orders",
              element: <Orders />,
              children: [
                {
                  path: ":orderId",
                  element: <OrderId />,
                },
              ],
            },
            {
              path: ":username/saveditems",
              element: <SavedItems />,
            },
            {
              path: "user-profile/:username",
              element: <Profile />,
            },
            {
              path: "allorders",
              element: <Shoporders />,
            },
            {
              path: "manage-product",
              element: <Manageproduct />,
            },
            {
              path: "add-new-product",
              element: <CreateProduct />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
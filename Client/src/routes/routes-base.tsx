//routes-base.ts
import { createBrowserRouter } from "react-router-dom";
import Root from "./root.routes";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import AdminPage from "../pages/admin";
import Customers from "../pages/admin/components/customers";
import Orders from "../pages/admin/components/orders";
import Stats from "../pages/admin/components/stats";
import Profile from "../pages/admin/components/profile";
import NotificationsPage from "../pages/admin/components/notifications";
import Products from "../pages/admin/components/products";
import Categories from "../pages/admin/components/categories";

export const pages = [
  {
    path: "/",
    label: "Home",
    element: <Home />,
  },
  {
    path: "/login",
    label: "Login",
    element: <Login />,
  },
  {
    path: "/signup",
    label: "Signup",
    element: <Signup />,
  },
  {
    path: "/admin/*",
    label: "Admin",
    element: <AdminPage />,
    children: [
      {
        path: "customers",
        label: "Customers",
        element: <Customers />,
      },
      {
        path: "categories",
        label: "Categories",
        element: <Categories />,
      },
      {
        path: "products",
        label: "Products",
        element: <Products />,
      },
      {
        path: "orders",
        label: "Orders",
        element: <Orders />,
      },
      {
        path: "stats",
        label: "Stats",
        element: <Stats />,
      },
      {
        path: "notifications",
        label: "Notifications",
        element: <NotificationsPage />,
      },
      {
        path: "profile",
        label: "Profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...pages],
  },
]);

export default router;

//routes-base.ts
import { createBrowserRouter } from "react-router-dom";
import Root from "./root.routes";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";

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
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...pages],
  },
]);

export default router;

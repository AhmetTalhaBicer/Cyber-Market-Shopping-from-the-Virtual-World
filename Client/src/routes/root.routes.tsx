import { AppBar, Container } from "@mui/material";
import Navbar from "../components/common/navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <Container maxWidth="lg">
      <AppBar>{!isLoginPage && !isSignupPage && <Navbar />}</AppBar>
      <Outlet />
    </Container>
  );
}

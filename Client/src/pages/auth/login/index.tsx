import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useAuth } from "../../../context/authContext";
import KeyModal from "./components/Modal/keyModal";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import googleButton from "../../../assets/google/google_Button.png";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { handleLogin, getSecretKey, handleGoogleLogin, isAuthenticated } =
    useAuth();

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const loginResponse = await handleLogin(data);
      const accessToken = loginResponse.accessToken;
      localStorage.setItem("access-token", accessToken);
      const key = await getSecretKey(accessToken);
      setSecretKey(key);
      setShowKeyModal(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const googleLogin = async () => {
    try {
      await handleGoogleLogin();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://source.unsplash.com/random')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)} // Add handleSubmit with onSubmit
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")} // Add register for email field
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")} // Add register for password field
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              sx={{ mt: 3, mb: 2, ml: 12, backgroundColor: "transparent" }}
              onClick={googleLogin}
            >
              <img
                className="btn-auth-img"
                src={googleButton}
                alt="google sign in"
              />
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <KeyModal
          open={showKeyModal}
          onClose={() => setShowKeyModal(false)}
          secretKey={secretKey}
        />
      </Container>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Cyber Market: Shopping From The Virtual World
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default LoginForm;

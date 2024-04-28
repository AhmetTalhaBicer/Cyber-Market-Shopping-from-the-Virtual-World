import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useAuth } from "../../../context/authContext";
import KeyModal from "./components/Modal/keyModal";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import googleButton from "../../../assets/google/google_Button.png";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { theme, Background } from "../theme";

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
    <ThemeProvider theme={theme}>
      <Background>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            width: "100%",
            height: "auto",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 8,
              padding: 3,
              backgroundColor: "transparent",
              background: "transparent",
              border: "2px solid rgba(255, 255, 255, .1)",
              backdropFilter: "blur(30px)",
              borderRadius: 10,
              boxShadow: "0 0 10px rgba(0, 0, 0, .2)",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "white",
                fontFamily: "'Jersey 15', sans-serif",
                fontSize: "3.5rem",
                padding: 1,
                borderRadius: 5,
              }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)} // Add handleSubmit with onSubmit
              noValidate
              sx={{
                mt: 1,
              }}
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
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  borderRadius: 10,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        color: "white",
                      }}
                    >
                      <MailIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: {
                      color: "white",
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                    fontFamily: "'Jersey 15', sans-serif",
                    fontSize: "1.3rem",
                  },
                }}
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
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  borderRadius: 10,
                  color: "white",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        color: "white",
                      }}
                    >
                      <LockIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: { color: "white" },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                    fontFamily: "'Jersey 15', sans-serif",
                    fontSize: "1.3rem",
                  },
                }}
              />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        sx={{
                          color: "white",
                          "&$checked": {
                            color: "white",
                            fontFamily: "'Jersey 15', sans-serif",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{
                      color: "white",
                      fontFamily: "'Jersey 15', sans-serif",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    Forgot password ?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  borderRadius: 5,
                  fontFamily: "'Jersey 15', sans-serif",
                  fontSize: "1.3rem",
                }}
              >
                Sign In
              </Button>
              <Button
                sx={{
                  mt: 2,
                  mb: 2,
                  ml: 9,
                  fontFamily: "sans-serif",
                  backgroundColor: "transparent",
                }}
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
                  <Typography textAlign="center">
                    <Link
                      href="/signup"
                      variant="body2"
                      sx={{
                        color: "white",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Typography>
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
      </Background>
    </ThemeProvider>
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
      sx={{
        mt: 3,
        color: "white",
        fontFamily: "'Jersey 15', sans-serif",
        fontSize: "1rem",
      }}
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

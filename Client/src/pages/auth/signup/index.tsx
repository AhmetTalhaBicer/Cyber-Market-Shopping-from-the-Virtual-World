// SignupForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Container, Grid, InputAdornment, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Background, theme } from "../theme";
import LockIcon from "@mui/icons-material/Lock";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const { handleSignup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      setLoading(true);
      await handleSignup(data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
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
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                mt: 1,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                    autoFocus
                    variant="outlined"
                    sx={{
                      border: "1px solid white",
                      backgroundColor: "transparent",
                      borderRadius: 10,
                      color: "white",
                      mb: 3,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            color: "white",
                          }}
                        >
                          <AccountCircle />
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
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
                          <AccountCircle />
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
                </Grid>
              </Grid>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                error={Boolean(errors.email)}
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  borderRadius: 10,
                  color: "white",
                  mb: 3,
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
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters",
                  },
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  borderRadius: 5,
                  fontFamily: "'Jersey 15', sans-serif",
                  fontSize: "1.3rem",
                  mb: 3,
                }}
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Typography textAlign="center">
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{
                        color: "white",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {"Already have an account? Sign In"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
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

export default SignupForm;

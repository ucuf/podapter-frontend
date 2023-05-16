import * as React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import useRefreshToken from "../hooks/useRefreshToken";
import { FormHelperText } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://poducer.com/">
        Poducer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

type AuthResponse = {
  authToken: string;
  refreshToken: string;
};

type val = {
  value: string;
  error?: {
    message: string;
  };
};

const theme = createTheme();
export default function SignIn() {
  const { setAuth } = useAuth();
  const refresh = useRefreshToken();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [username, setUsername] = useState<val>({ value: "" });
  const [password, setPassword] = useState<val>({ value: "" });

  const [formError, setFormError] = useState("");

  React.useEffect(() => {
    const relogin = async () => {
      const newAccessToken = await refresh();
      const response = await axios.get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      const { username } = response.data;
      setAuth((prev) => {
        return { ...prev, username };
      });
      navigate(from, { replace: true });
    };

    relogin();
  }, [from, navigate, refresh, setAuth]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.value === "")
      setUsername({ value: "", error: { message: "Username is required" } });
    if (password.value === "")
      setPassword({ value: "", error: { message: "Password is required" } });

    console.log({ username, password });
    try {
      const response = await axios.post(
        "/api/v1/auth/authenticate",
        JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const authResponse: AuthResponse = response?.data;
      const { authToken: accessToken, refreshToken } = authResponse;
      console.log({ refreshToken });
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      setAuth({
        accessToken,
        username: username.value,
        password: password.value,
      });
      setUsername({ value: "" });
      setPassword({ value: "" });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.error("No Server Response");
        setFormError("No Server Response");
      } else if (err.response?.status === 400) {
        console.error("Missing Username or Password");
        setFormError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.error("Unauthorized");
        setFormError("Unauthorized");
      } else {
        console.error("Login Failed");
        setFormError("Something went wrong");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={username.error}
              helperText={username.error?.message}
              value={username.value}
              onChange={(e) => setUsername({ value: e.target.value })}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={password.error}
              helperText={password.error?.message}
              value={password.value}
              onChange={(e) => setPassword({ value: e.target.value })}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {formError && (
              <FormHelperText error sx={{ textAlign: "center" }}>
                {formError}
              </FormHelperText>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

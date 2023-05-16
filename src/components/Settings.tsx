import { Copyright, LocationSearching } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Episode, EpisodeContentType } from "../types/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import PageLayout from "./layout/PageLayout";
import useAuth from "../hooks/useAuth";

const theme = createTheme();
export default function Settings() {
  const axiosPrivate = useAxiosPrivate();


    let {auth, setAuth} = useAuth();
    let [username, setUsername] = useState(auth.username);
    let [email, setEmail] = useState(auth.email);
    let [password, setPassword] = useState("");
    let [passwordConfirm, setPasswordConfirm] = useState("");
    let [passwordMatch, setPasswordMatch] = useState(false);
    let navigate = useNavigate();


    useEffect(()=>{
        setPasswordMatch(password === passwordConfirm);
    },[passwordConfirm]);

    useEffect((
        // we should set errors here
    )=>{},[passwordMatch])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const data = {
      username,
      email,
      password,
    };

    console.log(data);

    if(!passwordMatch){
        console.log("PASSWORD DON'T MATCH");
        return;
    }

    try {
      const response = await axiosPrivate.put(
        `/api/v1/user`,
        JSON.stringify(data)
      );

      const {username: newUsername, email: newEmail} = response.data;
      console.log("UPDATE RESPONSE",response);
      

      console.log("NEW USERNAME",newUsername, "NEW EMAIL",newEmail);
      setAuth((prev) => {
        return { ...prev, newUsername, newEmail };
      });
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/profile", { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.error("No Server Response");
      } else if (err.response?.status === 400) {
        if (err.response?.data) {
          const { data } = err.response;
          console.error(data.message);
          data.subErrors.forEach((subError) => {
            console.error(subError.message);
          });
        }
      } else if (err.response?.status === 401) {
        console.error("Unauthorized");
      } else {
        console.error("Unknown error");
      }
    }
  };


  return (
      <PageLayout title={"Settings"}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Typography component="h1" variant="h5">
              Edit content
            </Typography> */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Password Confirmation"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="passwordConfirm"
                  />
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
      </PageLayout>
  );
}

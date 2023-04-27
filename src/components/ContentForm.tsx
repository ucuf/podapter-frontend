import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Episode, EpisodeContentType } from "../types/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import PageLayout from "./layout/PageLayout";

const theme = createTheme();
export default function ContentForm() {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<EpisodeContentType | "auto">(
    "auto"
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      title,
      url,
      description,
      contentType: contentType !== "auto" ? contentType : undefined,
      pubDate: selectedDate?.toISOString(),
    };

    console.log(data);
    try {
      const response = await axiosPrivate.post(
        "/api/v1/content",
        JSON.stringify(data)
      );

      const episode: Episode = response.data;

      console.log(episode);
      setTitle("");
      setUrl("");
      setDescription("");
      navigate(from, { replace: true });
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
              <PageLayout title={"Add New Content"}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="xs">
        {/* <Layout> */}
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    name="url"
                    label="Url"
                    type="url"
                    id="url"
                    autoComplete="url"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                    autoComplete="description"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    labelId="contentType"
                    id="contentType"
                    value={contentType}
                    label="Content Type"
                    autoWidth
                    onChange={(e) =>
                      setContentType(e.target.value as EpisodeContentType)
                    }
                  >
                    <MenuItem value="auto" defaultChecked>
                      Content Type
                    </MenuItem>
                    <MenuItem value="audio/mpeg">mpeg</MenuItem>
                    <MenuItem value="audio/ogg">ogg</MenuItem>
                    <MenuItem value="audio/wav">wav</MenuItem>
                    <MenuItem value="audio/webm">webm</MenuItem>
                    <MenuItem value="audio/aac">acc</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Select publish date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e);
                      console.log({ e });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
              </PageLayout>
  );
}
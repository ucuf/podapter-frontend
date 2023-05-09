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

const theme = createTheme();
export default function EditContentForm() {
  const axiosPrivate = useAxiosPrivate();

  const { episodeId } = useParams();
  console.log({ episodeId });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const existingEpisode: Episode = location.state?.episode;

  const [title, setTitle] = useState(existingEpisode?.title ?? "");
  const [url, setUrl] = useState(existingEpisode?.url ?? "");
  const [description, setDescription] = useState(
    existingEpisode?.description ?? ""
  );
  const [contentType, setContentType] = useState<EpisodeContentType | "auto">(
    existingEpisode?.contentType ?? "auto"
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(existingEpisode?.pubDate ?? "")
  );
  const [tags, setTags] = useState<string[]>(existingEpisode.tags ?? []);
  const [tagOptions, setTagOptions] = useState<string[]>(["tag2", "tag3"]);

  useEffect(() => {
    if (!location.state?.episode) {
      navigate("/profile", { replace: true });
    }
  }, [location.state?.episode, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      title,
      url,
      description,
      contentType: contentType !== "auto" ? contentType : undefined,
      pubDate: selectedDate?.toISOString(),
      tags,
    };

    console.log(data);
    try {
      const response = await axiosPrivate.put(
        `/content/${episodeId}`,
        JSON.stringify(data)
      );

      const episode: Episode = response.data;

      console.log(episode);
      setTitle("");
      setUrl("");
      setDescription("");
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
      <PageLayout title={"Edit Content"}>
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
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={tagOptions}
                    value={[...tags]}
                    // onChange={(e) => console.log(e)}
                    onChange={(event, _tags) => {
                      setTags(_tags);
                    }}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          key={option}
                          variant="filled"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tags"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {/* <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                value={tags}
                onChange={(e) => setTags([...tags, e.target.value])}
                freeSolo
                autoSelect
                options={tags}
                getOptionLabel={(option) => {
                  console.log({ option });
                  return option;
                }}
                defaultValue={[...tags]}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Tags" />
                )}
                sx={{ width: "500px" }}
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
      </PageLayout>
  );
}

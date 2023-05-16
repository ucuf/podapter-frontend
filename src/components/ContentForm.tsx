import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  FormHelperText,
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

type val = { value: string; error?: { message: string } };

const theme = createTheme();
export default function ContentForm() {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [title, setTitle] = useState<val>({ value: "" });
  const [url, setUrl] = useState<val>({ value: "" });
  const [description, setDescription] = useState<val>({ value: "" });
  const [contentType, setContentType] = useState<EpisodeContentType | "auto">(
    "auto"
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>(["tag2", "tag3"]);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.value === "")
      setTitle({ value: "", error: { message: "Title is required" } });
    if (url.value === "")
      setUrl({ value: "", error: { message: "URL is required" } });

    const data = {
      title: title.value,
      url: url.value,
      description: description.value,
      contentType: contentType !== "auto" ? contentType : undefined,
      pubDate: selectedDate?.toISOString(),
      tags,
    };

    console.log(data);
    try {
      const response = await axiosPrivate.post(
        "/content",
        JSON.stringify(data)
      );

      const episode: Episode = response.data;

      console.log(episode);
      setTitle({ value: "", error: undefined });
      setUrl("");
      setDescription("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.error("No Server Response");
        setFormError("No server Response");
      } else if (err.response?.status === 400) {
        if (err.response?.data) {
          const { data } = err.response;
          console.error(data.message);
          data.subErrors.forEach((subError) => {
            console.error(subError.message);
          });
          setFormError("Invalid data");
        }
      } else if (err.response?.status === 401) {
        setFormError("Unauthorized user");
        console.error("Unauthorized");
      } else {
        setFormError("Something went wrong");
        console.error("Unknown error");
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={title.error}
                helperText={title.error?.message}
                value={title.value}
                onChange={(e) =>
                  setTitle({ value: e.target.value, error: undefined })
                }
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
                error={url.error}
                helperText={url.error?.message}
                value={url.value}
                onChange={(e) => setUrl({ value: e.target.value })}
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
                value={description.value}
                onChange={(e) => setDescription({ value: e.target.value })}
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
            Add
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

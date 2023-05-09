import * as React from "react";
import EpisodesList from "../EpisodesList";
import { ThemeProvider } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Episode } from "../../types/types";
import PageLayout from "../layout/PageLayout";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import PodcastLinkDialog from "../PodcastLinkDialog";

const theme = createTheme();
export default function UserContent() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [limit, setLimit] = useState(-1);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>(["tag2", "tag3"]);
  const [query, setQuery] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEpisodes = async () => {
      try {
        const res = await axiosPrivate.get("/content", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setEpisodes(res.data);
      } catch (error) {
        if (isMounted) {
          console.error("Failed fetching episodes", error);
        }
      }
    };
    getEpisodes();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleDelete = async (episode: Episode) => {
    try {
      const res = await axiosPrivate.delete(`/content/${episode.id}`);
      setEpisodes((prevEpisodes) =>
        prevEpisodes.filter((ep) => ep.id !== episode.id)
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const filterEpisodes = (episodes: Episode[]) => {
    let filtered = [...episodes];
    filtered = filtered.filter((ep) => {
      const timestamp = new Date(ep.pubDate).getTime();

      const isInTimeInterval =
        (startDate == null || timestamp >= startDate.toDate().getTime()) &&
        (endDate == null || timestamp <= endDate?.toDate().getTime());

      return (
        isInTimeInterval && ep.title.toLowerCase().includes(query.toLowerCase())
      );
    });

    filtered =
      tags.length === 0
        ? filtered
        : filtered.filter((ep) => {
            for (let i = 0; i < tags.length; i++)
              if (ep.tags?.includes(tags[i])) return true;
            return false;
          });

    return limit <= -1
      ? filtered
      : filtered.splice(0, Math.min(filtered.length, limit));
  };

  const generatePodcastLink = () => {
    let baseLink = `http://localhost:8080/podcast/${auth.username}?limit=${limit}`;
    if (startDate != null)
      baseLink += `&dateStart=${startDate.format("YYYY-MM-DD")}`;
    if (endDate != null) baseLink += `&dateEnd=${endDate.format("YYYY-MM-DD")}`;
    if (tags.length > 0) baseLink += `&tag=${tags[0]}`;
    return baseLink;
  };

  return (
    <PageLayout title={"Your Content"}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid   container  spacing={2}>
            <Grid height={"75vh"} overflow={"scroll"} item xs={12} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 34 }}
                    // color="text.secondary"
                    gutterBottom
                  >
                    Filters
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-number"
                      label="Episode limit"
                      value={limit}
                      onChange={(e) => {
                        const n = parseInt(e.target.value);
                        console.log(n);
                        setLimit(
                          typeof n === "number" && !isNaN(n)
                            ? Math.max(n, -1)
                            : -1
                        );
                      }}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Select start date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e);
                          console.log({ e });
                        }}
                      />
                      <DatePicker
                        label="Select end date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e);
                          console.log({ e });
                        }}
                      />
                    </LocalizationProvider>
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
                    <TextField
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      id="outlined-search"
                      label="Search"
                      type="search"
                    />
                    {/* <Button variant="outlined" onClick={handleClickOpen}>
                      Generate
                    </Button> */}
                    <Button
                      variant="outlined"
                      type="reset"
                      onClick={() => {
                        setTags([]);
                        setEndDate(null);
                        setStartDate(null);
                        setLimit(-1);
                        setQuery("");
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                  {/* <PodcastLinkDialog
                    podcastLink={generatePodcastLink()}
                    handleClose={handleClose}
                    isOpen={open}
                  /> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} overflow={"scroll"} maxHeight={"75vh"}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 34 }}
                    // color="text.secondary"
                    gutterBottom
                  >
                    Episodes
                  </Typography>
                  <EpisodesList
                    episodes={filterEpisodes(episodes)}
                    handleDelete={handleDelete}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </ThemeProvider>
    </PageLayout>
  );
}

import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  createTheme,
} from "@mui/material";
import PageLayout from "../layout/PageLayout";
import { useState } from "react";
import PodcastLinkDialog from "../PodcastLinkDialog";

const theme = createTheme();
export default function VideosToPodcast() {
  const [limit, setLimit] = useState(-1);
  const [videosUrl, setVidoesUrl] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLimit(-1);
    setVidoesUrl("");
  };
  const generatePodcastLink = () => {
    return `http://localhost:8080/podcast?limit=${limit}&url=${videosUrl}`;
  };

  return (
    <PageLayout title={"Vidoes to podcast"}>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <TextField
            id="outlined-number"
            label="Episode limit"
            value={limit}
            onChange={(e) => {
              const n = parseInt(e.target.value);
              console.log(n);
              setLimit(
                typeof n === "number" && !isNaN(n) ? Math.max(n, -1) : -1
              );
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={videosUrl}
            onChange={(e) => setVidoesUrl(e.target.value)}
            id="outlined-search"
            label="YouTube playlist/channel url"
            type="url"
          />
          <Button variant="outlined" onClick={handleClickOpen}>
            Generate
          </Button>
          <PodcastLinkDialog
            podcastLink={generatePodcastLink()}
            handleClose={handleClose}
            isOpen={open}
          />
        </Container>
      </ThemeProvider>
    </PageLayout>
  );
}

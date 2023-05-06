import * as React from "react";
import { Autocomplete, Box, Button, Chip, Grid, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Episode } from "../types/types";
import { useNavigate } from "react-router-dom";

function timeAgo(dateStr: string) {
  const date: any = new Date(dateStr);
  const currentDate: any = new Date();
  const seconds = Math.floor((currentDate - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " days ago";
  } else if (hours > 0) {
    return hours + " hours ago";
  } else if (minutes > 0) {
    return minutes + " minutes ago";
  } else {
    return seconds + " seconds ago";
  }
}

function lengthFormat(lengthInSeconds: number): string {
  const hours = Math.floor(lengthInSeconds / 3600);
  const minutes = Math.floor((lengthInSeconds - hours * 3600) / 60);

  const formattedLength: string =
    hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;

  return formattedLength;
}

type Props = {
  episodes: Episode[];
  handleDelete: (episode: Episode) => void;
};

export default function EpisodesList({ episodes, handleDelete }: Props) {
  const navigate = useNavigate();
  return (
<Grid container spacing={1} m={0}>
      {episodes.map((episode) => (
        <Grid fontSize={"12px"} item xs={12} sm={6} md={4} key={episode.id}>
          <p title={new Date(episode.pubDate).toLocaleString()}>
            {timeAgo(episode.pubDate)}
          </p>
          <h3>{episode.title}</h3>
          <p>
            {episode.description
              ? `${episode.description.substring(0, 140)}${
                  episode.description.length > 30 ? "..." : ""
                }`
              : ""}
          </p>
          <audio controls>
            <source src={episode.url} type={episode.contentType} />
            Your browser does not support the audio element.
          </audio>
          <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={episode.tags ?? []}
            readOnly
            size="small"
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
              <TextField {...params} variant="outlined" label="Episode tags" />
            )}
          />
          <Button
            onClick={() => handleDelete(episode)}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={() =>
              navigate(`/edit/${episode.id}`, { state: { episode } })
            }
            variant="outlined"
          >
            Edit
          </Button>
        </Grid>
      ))}
</Grid>
  );
}

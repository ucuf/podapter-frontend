import * as React from "react";
import { Button } from "@mui/material";
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
    <ol>
      {episodes.map((episode) => (
        <li key={episode.id}>
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
        </li>
      ))}
    </ol>
  );
}

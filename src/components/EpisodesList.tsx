import * as React from "react";
import { Autocomplete, Box, Button, Chip, Divider, Grid, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Episode } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Track, PlayerInterface } from 'react-material-music-player'
import { PlayCircle } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

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
  let auth = useAuth().auth;

  let track = new Track("https://cdnm.meln.top/mr/Quran%20-%20Al-Kahf.mp3?session_key=f3e4ab8d21b5d995a92cdacdadf62375&hash=11763e8727c8742869ff2434a7c6938e","http://www.ahadubai.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holy_quran.jpg","Quran Surat Al Kahf","Saad Al Ghamdi","https://cdnm.meln.top/mr/Quran%20-%20Al-Kahf.mp3?session_key=f3e4ab8d21b5d995a92cdacdadf62375&hash=11763e8727c8742869ff2434a7c6938e")
  let trackList = episodes.map((ep)=>new Track(ep.id.toString(),"http://www.ahadubai.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holy_quran.jpg",ep.title,auth.username,ep.url));

  PlayerInterface.play(trackList);

  return (
<Grid container  spacing={2} mr={0}>
      {episodes.map((episode,index) => (
        <Grid sx={{backgroundColor:"#eeeeee",margin:2,padding:4}} fontSize={"12px"} item xs={12}  key={episode.id}>
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
          {/* <audio controls>
            <source src={episode.url} type={episode.contentType} />
            Your browser does not support the audio element.
          </audio> */}
          {/* <Button onClick={()=>{ PlayerInterface.play( [new Track(episode.id.toString(),"",episode.title,auth.username,episode.url),...trackList] ) }}><PlayCircle/></Button> */} 
          
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
          <Button  variant="outlined"  sx={{}} onClick={()=>{ PlayerInterface.changeTrack(index); PlayerInterface.play() }} startIcon={<PlayCircle/>}>Play</Button>
          <Button
            onClick={() =>
              navigate(`/edit/${episode.id}`, { state: { episode } })
            }
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(episode)}
            variant="outlined"
          >
            <DeleteIcon />
          </Button>
        </Grid>
      ))}
</Grid>
  );
}

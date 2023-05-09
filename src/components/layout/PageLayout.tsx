import * as React from "react";
import { AppBar, Box, Divider, Typography } from "@mui/material";
import Title from "../Title";
import Player from 'react-material-music-player' // default export
import { Track, PlayerInterface } from 'react-material-music-player'

const PageLayout = ({children, title}) => {

  return (
    <div>
      <Box  sx={{backgroundColor:"primary"}} >
        <Title>
        {(title+"").toUpperCase()}
        </Title>
      </Box>
    <Divider />
    <Box height={"80vh"} overflow={"scroll"} sx={{padding:"1rem"}}>
    {children}
    </Box>
    {/* <Player  sx={{with: "75vw", zIndex: "50000000"}}    /> */}
    </div>
  ) 
};

export default PageLayout;

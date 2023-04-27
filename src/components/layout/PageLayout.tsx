import * as React from "react";
import { AppBar, Box, Divider, Typography } from "@mui/material";
import Title from "../Title";

const PageLayout = ({children, title}) => {

  return (
    <div>
      <Box sx={{backgroundColor:"primary"}} >
        <Title>
        {(title+"").toUpperCase()}
        </Title>
      </Box>
    <Divider />
    <Box sx={{padding:"1rem"}}>
    {children}
    </Box>
    </div>
  ) 
};

export default PageLayout;

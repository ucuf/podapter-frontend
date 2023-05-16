import * as React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";

export default function Home() {
  return (
    <main>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={0} textColor="inherit">
          <Tab label="Popular" />
          <Tab label="Recent" />
          <Tab label="Java" />
          <Tab label="Software Engineering" />
          <Tab label="AI" />
        </Tabs>
      </AppBar>
      <Box sx={{ padding: "1rem" }}>
        Home: here will be a list of content filtered by the labels above.
        <br /> there will be two permanent filters, Popular and Recent, in
        addition to the labels that a user maybe subscribed to or like
      </Box>
    </main>
  );
}

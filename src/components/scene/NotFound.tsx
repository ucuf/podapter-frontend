import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme();
export default function NotFound() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <h1>Not Found</h1>
        </Container>
      </ThemeProvider>
    </>
  );
}

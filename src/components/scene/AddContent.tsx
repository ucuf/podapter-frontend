import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  createTheme,
} from "@mui/material";
import PageLayout from "../layout/PageLayout";
import CreateContent from "../ContentForm";
import UploadContent from "../UploadContent";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const theme = createTheme();
export default function AddContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab label="Create content" />
          <Tab label="Upload content" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PageLayout title={"Add content from the Internet"}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CreateContent />
            </Container>
          </ThemeProvider>
        </PageLayout>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PageLayout title={"Upload content"}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <UploadContent />
            </Container>
          </ThemeProvider>
        </PageLayout>
      </TabPanel>
    </>
  );
}

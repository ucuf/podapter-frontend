import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import {
  Add,
  AddBox,
  AddCard,
  AddCircle,
  AddToQueue,
  AttachMoney,
  AudioFile,
  Audiotrack,
  BookmarkAdd,
  BrokenImage,
  FilePresent,
  Home,
  Info,
  Language,
  Login,
  Logout,
  Money,
  MoneyRounded,
  Payment,
  Person,
  Podcasts,
  PriceChange,
} from "@mui/icons-material";
import { Link, Location, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.primary"
      align="center"
      sx={{ backgroundColor: "white" }}
    >
      {"Copyright © "}
      <Link color="inherit" to="http://2pod.com/">
        2Pod
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  let location = useLocation();

  const categories = [
    {
      children: [
        {
          id: "Your Content",
          href: "profile",
          icon: <AudioFile />,
          active: location.pathname == "/profile",
        },
        {
          id: "Add Episodes",
          href: "add",
          icon: <AddCircle />,
          active: location.pathname == "/add",
        },
        {
          id: "Generate a podcast",
          href: "generatePodcast",
          icon: <Podcasts />,
          active: location.pathname == "/generatePodcast",
        },
        {
          id: "Videos to podcast",
          href: "vidoesToPodcast",
          icon: <Podcasts />,
          active: location.pathname == "/videosToPodcast",
        },
        {
          id: "Hosting",
          href: "hosting",
          icon: <DnsRoundedIcon />,
          active: location.pathname == "",
        },
        {
          id: "Pricing",
          href: "pricing",
          icon: <AttachMoney />,
          active: location.pathname == "",
        },
        {
          id: "About",
          href: "about",
          icon: <Info />,
          active: location.pathname == "/about",
        },
      ],
    },
    {
      children: [
        { id: "Analytics", icon: <SettingsIcon /> },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            fontFamily: "Proza Libre, monospace",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <BookmarkAdd /> */}
          <span>2POD</span>
        </ListItem>
        <Link to={"/"}>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText>Discover</ListItemText>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, href }) => (
              <Link key={childId} to={`${href}`}>
                <ListItem disablePadding>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
      <Copyright />
    </Drawer>
  );
}

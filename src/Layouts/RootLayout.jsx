import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Search,
  Clear,
  Settings,
  NotificationsOutlined,
  MonetizationOnIcon,
  Menu,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NmsContext } from "../context/NmsContext";
import { pathToTitlesConversion, getUserInfo } from "../utils";
import Sidebar from "../Layouts/SideBar/Sidebar";
import { Tooltip, Typography, Grid, Badge } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { StyledRoot } from "../components/GlobalStyledComponents/GlobalStyledComponents";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Avatar from "@material-ui/core/Avatar";
import TimelineIcon from '@material-ui/icons/Timeline';
import GrainIcon from '@material-ui/icons/Grain';
import {SearchComponent} from '../components/SearchComponent';
import ViewToggleButtons from '../components/ViewToggleButtons';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GridOnIcon from '@material-ui/icons/GridOn';

// Styled Components
const TitleText = styled(Typography)`
  color: #000000;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  padding: 4px 0px 4px 14px;
  width: 100%;
  border: ${(props) =>
    props?.border ? "1px solid lightgrey" : "1px solid lightgrey"};
  color: black;
  caret-color: black;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 10px 8px;
  outline: none;
`;

const NmsDiv = styled.div`
  padding: 4px 4px 4px 8px;
  font-size: 26px;
  color: #2f2d46;
`;

const StyledIconButton = styled(IconButton)`
  padding: 11px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  background-color: #fff;
`;

const StyledSettingsButton = styled(IconButton)`
  padding: 11px;
  border-radius: 6px;
  color: #2f2d46;
  border: 1px solid lightgrey;
`;
const StyledBadge = styled(Badge)`
  & .MuiBadge-dot {
    background-color: green;
    margin-top: 6px;
    margin-right: 6px;
  }
`;

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ffffff",
    boxShadow: "none",
    padding: "10px 0px",
    borderBottom: "1px solid #eaeaea",
    color: "#373737",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    borderBottom: "1px solid #eaeaea",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: "#373737",
  },
  menuButton: {
    marginRight: 30,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    height: "100%",
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#ffffff", // Sidebar background color
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#ffffff", // Sidebar background color when open
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "lightgray",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "lightgray",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
    },
  },
  drawerClose: {
    backgroundColor: "#ffffff", // Sidebar background color when closed
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "17.9px 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  searchIconButton: {
    padding: "0px",
    marginRight: "8px",
  },
  searchClearIcon: {
    fontSize: "24px",
    color: "#808080",
  },
  listItem: {
    paddingLeft: "25px",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    "&:active": {
      backgroundColor: "red",
    },
  },
  listItemIcon: {},
}));

export default function RootLayout() {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const { userName } = getUserInfo();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Database Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar
        style={{ backgroundColor: "#ffffff", color: "#6d879a", top: "85px", boxShadow:'none', borderBottom: "1px solid #c9cbcc", padding: '10px 0px' }}
        position="sticky"
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={3}>
            < ViewToggleButtons/>
            </Grid>
            <Grid item xs={9}>
            <SearchComponent />
            </Grid>
          </Grid>
          
            
          
        </Toolbar>
      </AppBar>

      <main className={classes.content} >
        <div className={classes.toolbar} />
        <div style={{ marginTop: "20px" }} />
        <Outlet />
      </main>
    </div>
  );
}

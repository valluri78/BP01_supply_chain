import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Search, Clear, Settings, NotificationsOutlined, MonetizationOnIcon } from "@material-ui/icons";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NmsContext } from "../context/NmsContext";
import { pathToTitlesConversion, getUserInfo } from "../utils";
import Sidebar from '../Layouts/SideBar/Sidebar';
import { Tooltip, Typography, Grid, Badge } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { StyledRoot } from "../components/GlobalStyledComponents/GlobalStyledComponents";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


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
    border: ${(props) => (props?.border ? "1px solid lightgrey" : "1px solid lightgrey")};
    color: black;
    caret-color: black
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
    color: #fff;
`;

const StyledIconButton = styled(IconButton)`
    padding: 11px;
    border:1px solid lightgrey;
    border-radius:6px;
    background-color:#fff;
`;

const StyledSettingsButton = styled(IconButton)`
    padding: 11px;
    border-radius:6px;
    background-color:#364860;
    color:#928ea9;
`;
const StyledBadge = styled(Badge)`
    & .MuiBadge-dot {
        background-color:green;
        margin-top:6px;
        margin-right:6px;
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
        backgroundColor: "#fafafd",
        boxShadow: "none",
        padding: "10px 0px",
        borderBottom: "1px solid lightgray",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        borderBottom: "1px solid lightgray",
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
        backgroundColor: "#364860", // Sidebar background color
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundColor: "#364860", // Sidebar background color when open
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
        backgroundColor: "#364860", // Sidebar background color when closed
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
        marginRight: "8px"
    },
    searchClearIcon: {
        fontSize: "24px",
        color: "#808080"
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
    const [closeSubMenus, setCloseSubMenus] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [focus, setFocus] = useState(false);
    const { logout } = useAuth();
    const { setSidebar } = useContext(NmsContext);

    // To get a current path
    const location = useLocation();
    const path = location.pathname.split("/").pop();
    // const heading = convertToTitleCase(path);
    const heading = pathToTitlesConversion(path);

    const openSidebar = () => {
        setSidebar(true);
        setOpen(true);
    };

    const closeSidebar = () => {
        setOpen(false);
        setCloseSubMenus(!closeSubMenus);
        setSidebar(false);
    };

    const [openAboutUs, setOpenAboutUs] = useState(false);
    const handleOpenAboutUs = () => {
        setOpenAboutUs(true);
        handleHelpMenuClose();
    };
    const handleCloseAboutUs = () => {
        setOpenAboutUs(false);
    };
    const handleOpenHelp = () => {
        const pdfUrl = "\\NMS-help_pdf.pdf";
        window.open(pdfUrl, '_blank');
        handleHelpMenuClose();
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const handleHelpMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleHelpMenuClose = () => {
        setAnchorEl(null);
    };

    // User Profile logout functionality
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
        userProfilePic: null,
    });
    const [anchorE2, setAnchorE2] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorE2(null);
    };
    const handleUserLogout = async () => {
        const response = await logout();
        if (response) {
            handleCloseUserMenu();
            navigate("/login");
        }
    };

    // SearchBar Functionality
    const handleSearchCancel = () => {
        setSearchText("");
    };

    // Avatar Functions
    const avatarInitialsGenerator = (name) => {
        if (!name) return null;
        const nameParts = name.split(" ");
        return nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                    <Grid container item xs={7} justifyContent="flex-start" alignItems="center" wrap="nowrap">
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={openSidebar}
                                    edge="start"
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}
                                >
                                     <AttachMoneyIcon style={{ color: "black", fontSize: "32px", }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" style={{ color: "#000000", fontWeight: "bold" }}>{heading}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container item xs={5} justifyContent="flex-end" alignItems="center" wrap="nowrap" columnGap={open ? 3 : 1}>
                            <Grid item style={{ minWidth: "275px", maxWidth: "275px", marginRight: "20px", }}>
                                <SearchContainer border={focus} >
                                    <Search />
                                    <SearchInput
                                        className="searchInput"
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        type="text"
                                        placeholder="Type keywords to search"
                                    />
                                    {searchText && (
                                        <span>
                                            <IconButton onClick={handleSearchCancel} className={classes.searchIconButton}>
                                                <Clear className="searchClearIcon" />
                                            </IconButton>
                                        </span>
                                    )}
                                </SearchContainer>
                            </Grid>

                            <Grid container xs={3} item justifyContent="flex-end" alignItems="center" wrap="nowrap">
                                <Grid item style={{ marginRight: "8px", }}>
                                    <Tooltip title="Notifications" arrow>
                                        <StyledIconButton className="headerIconButton">
                                            <StyledBadge variant="dot">
                                                <NotificationsOutlined className="headerIcon" />
                                            </StyledBadge>
                                        </StyledIconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Profile" arrow>
                                        <StyledSettingsButton className="headerIconButton">
                                            <Settings className="headerIcon" />
                                        </StyledSettingsButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                onMouseEnter={openSidebar}
                onMouseLeave={closeSidebar}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Grid container  alignItems="center" wrap="nowrap" style={{marginLeft:'12px'}}>
                                <Grid item>
                                <AttachMoneyIcon style={{ color: "white", fontSize: "28px" }} />
                                </Grid>
                                <Grid item>
                                    <NmsDiv className="nms">Cash Flow</NmsDiv>
                                </Grid>
                    </Grid>
                </div>
                <Divider />
                <Sidebar open={open} closeSubMenus={closeSubMenus} />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div style={{ marginTop: "20px" }} />
                <Outlet />
            </main>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItemText, Collapse } from "@material-ui/core";
import {
    DashboardOutlined,
    Assessment,
    PieChart,
    ExpandLess,
    ExpandMore,
    FiberManualRecord
} from "@material-ui/icons";
import {
    ExpandedListItem,
    IconSubListItem,
    StyledListIcon,
    StyledListIconForSubList,
    HoverContainer,
    StyledListItemText,
    SubListTypography
} from "./Sidebar.style";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TimelineIcon from '@material-ui/icons/Timeline';
import LinearScaleIcon from '@material-ui/icons/LinearScale';



const menuItems = [
    {
        label: "Dashboard",
        icon: <DashboardOutlined style={{ color: "white", fontSize: "22px" }} />,
        path: "/dashboard",
    },
    {
        label: "Transactions",
        icon: <SyncAltIcon style={{ color: "white", fontSize: "22px" }} />,
        path: "/transactions",
    },
    {
        label: "Canvas",
        icon: <TimelineIcon style={{ color: "white", fontSize: "22px" }} />,
        path: "/createNode",
    },
    {
        label: "Graph Visualization",
        icon: <LinearScaleIcon style={{ color: "white", fontSize: "22px" }} />,
        path: "/graphVisualization",
    },
    // {
    //     label: "Analytics",
    //     icon: <PieChart style={{ color: "white", fontSize: "22px" }} />,
    //     subItems: [
    //         { label: "All analytics", path: "/root/analytics/allanalytics", color: "skyblue" },
    //         { label: "Favorites", path: "/root/analytics/favorites", color: "orange" },
    //         { label: "New analytics", path: "/root/analytics/newanalytics", color: "green" },
    //     ],
    // },
];

const Sidebar = ({ open, closeSubMenus, active }) => {
    const [selectedTab, setSelectedTab] = useState("");
    const [expandedMenu, setExpandedMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedTab(active);
    }, [closeSubMenus]);

    const handleNavigation = (path, menuLabel) => {
        setSelectedTab(menuLabel);
        navigate(path);
    };

    return (
        <List style={{marginLeft:'-10px'}}>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <ExpandedListItem
                        style={{ backgroundColor: "#2e2559" }}
                        active={selectedTab === item.label}
                        button
                        onClick={() =>
                            item.subItems ?
                                setExpandedMenu(expandedMenu === item.label ? null : item.label) :
                                handleNavigation(item.path, item.label)
                        }
                    >
                        <StyledListIcon width={open ? "50px" : "70px"}>{item.icon}</StyledListIcon>
                        <ListItemText
                            primary={
                                <StyledListItemText
                                    style={{
                                        fontWeight: selectedTab === item.label ? "bold" : "normal",
                                    }}
                                    className="sidebarListText"
                                >
                                    {item.label}
                                </StyledListItemText>
                            }
                        />
                        {item.subItems && (
                            expandedMenu === item.label ? <ExpandLess style={{ color: "white" }} /> : <ExpandMore style={{ color: "grey" }} />
                        )}
                    </ExpandedListItem>

                    {item.subItems && (
                        <Collapse in={expandedMenu === item.label} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.subItems.map((subItem, subIndex) => (
                                    <IconSubListItem
                                        key={subIndex}
                                        style={{ backgroundColor: "#2e2559" }}
                                        active={selectedTab === subItem.label}
                                        button
                                        onClick={() => handleNavigation(subItem.path, subItem.label)}
                                    >
                                        <HoverContainer className="hoverContainer">
                                            <StyledListIconForSubList>
                                                <FiberManualRecord style={{ color: subItem.color, fontSize: "14px", height: "14px", width: "14px" }} />
                                            </StyledListIconForSubList>
                                            <ListItemText
                                                primary={
                                                    <SubListTypography active={selectedTab === subItem.label} className="sidebarListItemText">
                                                        {subItem.label}
                                                    </SubListTypography>
                                                }
                                            />
                                        </HoverContainer>
                                    </IconSubListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Sidebar;
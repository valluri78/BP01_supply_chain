import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Switch,
  Typography,
  ListItemText
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const GraphOptionsMenu = ({
  layoutOptions = ["Force-directed", "Horizontal Tree", "Vertical Tree"],
  initialLayout = "Vertical Tree",
  toggleOptions = [
    { label: "Model concepts", key: "modelConcepts", defaultValue: false },
    { label: "Full node text", key: "fullNodeText", defaultValue: false },
    { label: "Relationship labels", key: "relationshipLabels", defaultValue: false }
  ],
  onLayoutChange,
  onToggleChange
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [layout, setLayout] = useState(initialLayout);
  const [toggles, setToggles] = useState(
    toggleOptions.reduce((acc, option) => ({ ...acc, [option.key]: option.defaultValue }), {})
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubMenuAnchorEl(null);
  };

  const handleSubMenuOpen = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const handleLayoutChange = (selectedLayout) => {
    setLayout(selectedLayout);
    if (onLayoutChange) onLayoutChange(selectedLayout);
    handleSubMenuClose();
  };

  const handleToggleChange = (key) => {
    setToggles((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      if (onToggleChange) onToggleChange(key, newState[key]);
      return newState;
    });
  };

  return (
    <div>

      <IconButton onClick={handleMenuOpen}>
        <SettingsIcon style={{fontSize:'24px'}}/>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Typography variant="subtitle2" style={{ padding: "8px 16px", fontWeight: "bold" }}>
          Graph Options
        </Typography>

        {/* Layout Selection with Submenu */}
        <MenuItem onClick={handleSubMenuOpen}>
          <ListItemText primary={`Layout: ${layout}`} />
          {subMenuAnchorEl ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </MenuItem>

        {/* Submenu for Layout Options */}
        <Menu anchorEl={subMenuAnchorEl} open={Boolean(subMenuAnchorEl)} onClose={handleSubMenuClose}>
          {layoutOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleLayoutChange(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* Toggle Options */}
        {toggleOptions.map(({ label, key }) => (
          <MenuItem key={key}>
            <ListItemText primary={label} />
            <Switch checked={toggles[key]} onChange={() => handleToggleChange(key)} color="primary" />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default GraphOptionsMenu;

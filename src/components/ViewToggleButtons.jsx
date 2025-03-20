import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { List, Share } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: "#e3e9ee",
    borderRadius: "5px",
    padding: "2px",
  },
  toggleButton: {
    border: "1px solid #c9cbcc",
    // backgroundColor: "#f7f9fc",
    color: "#5a5f63",
    "&.Mui-selected": {
      backgroundColor: "#c9cbcc",
      color: "#333",
    },
    // "&:hover": {
    //   backgroundColor: "#dce4ec",
    // },
  },
}));

const ViewToggleButtons = () => {
  const classes = useStyles();
  const [selectedView, setSelectedView] = useState("graph");

  const handleChange = (event, newView) => {
    if (newView !== null) {
      setSelectedView(newView);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedView}
      exclusive
      onChange={handleChange}
      className={classes.root}
    >
      <ToggleButton value="list" className={classes.toggleButton}>
        <List />
      </ToggleButton>
      <ToggleButton value="graph" className={classes.toggleButton}>
        <Share />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggleButtons;

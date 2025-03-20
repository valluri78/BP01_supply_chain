import React, {useState} from 'react';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import styled from "styled-components";
import {  TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 6px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
    backgroundColor:'#ffffff',
    border: "1px solid #eaeaea",
    borderRadius:'10px',
    boxShadow:'none'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CustomSelect = styled(NativeSelect)({
  "& .MuiInputBase-root, &:before, &:after, &:hover:before": {
    borderBottom: "none !important",
    backgroundColor:'none !important'
  },
  "&.MuiNativeSelect-icon":{
    color:'#b3b3b3'
  },
  color:'#b8b8b8'
  
});

export const SearchComponent = () => {
  const classes = useStyles();
  const options = [
    { value: 'all', label: 'All' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];
  const [selectedValue, setSelectedValue] = useState("All");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    // handleChange is not defined, so we remove this block
  };

  

  return (
    <Paper component="form" className={classes.root}>
        <FormControl>
        <Select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className={classes.selectField}
          disableUnderline
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Articles">Articles</MenuItem>
          <MenuItem value="People">People</MenuItem>
          <MenuItem value="Projects">Projects</MenuItem>
        </Select>
      </FormControl>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder="Search your knowledge graph"
        inputProps={{ 'aria-label': 'Search your knowledge graph' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon style={{color:'#cccccc'}}/>
      </IconButton>
     
    </Paper>
  );
}

import { Avatar, Box, Button, Card, CardContent, Divider, Grid, MenuItem, Select, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import { StyledRoot } from '../../components/GlobalStyledComponents/GlobalStyledComponents'
import { ArrowDownward, ArrowDropDown, ArrowDropUp, EmojiSymbols, ExpandMore, Filter, FilterList, GetApp, MoreHoriz, SettingsOutlined, Star, Toll } from "@material-ui/icons";
import styled from "styled-components";
import { TotalSalesGraph } from "./TotalSalesGraph";
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";
import { orderListData, orderListTableColumns, salesReportMonths, totalScores } from './MockData';
import { makeStyles } from "@material-ui/styles";
import { SalesReportGraph } from "./SalesReportGraph";
import { OrderListTable } from './OrderListTable';
import { MonthlySalesGraph } from "./MonthlySalesGraph";
import { AvatarGroup } from "@material-ui/lab";

export const StyledTab = styled(Tab)`
    & .MuiTab-wrapper {
        flex-direction:row;
    }
`;

export const StyledTabs = styled(Tabs)`
    .MuiTab-labelIcon {
        min-height: 0px;
    }

    .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
        margin-bottom:0px;
        margin-right:4px;        
    }
`;

export const StyledSelect = styled(Select)`
background-color: #fff;
font-size:12px;
min-width:50px;
color: ${({ selectedColor }) => selectedColor || 'black'};
 border-radius: 4px; /* Add the desired border-radius */
  border: 1px solid #fff;

    &.MuiInput-underline:before,
    &.MuiInput-underline:after,
    &.MuiInput-underline:focus,
    &.MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: none;
    }
    .MuiSelect-select {
    background-color: white;
    padding-right:20px;
    padding-bottom:4px;
    padding-left:4px;
  }
`;
export const MonthlySalesSelect = styled(Select)`
background-color: #58c68b;
font-size:8px;
min-width:40px;
color: #fff;
 border-radius: 4px; /* Add the desired border-radius */
  border: 1px solid #58c68b;

    &.MuiInput-underline:before,
    &.MuiInput-underline:after,
    &.MuiInput-underline:focus,
    &.MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: none;
    }
    .MuiSelect-select {
    background-color: #58c68b;
    padding-right:20px;
    padding-bottom:4px;
    padding-left:4px;
  }
    .MuiSvgIcon-root {
    color: #fff;
    width:22px;
    height:22px;    
  }
`;

export const StyledMenuItem = styled(MenuItem)`
    font-size:12px;

    &.MuiInputBase-root {
        font-size: 12px;
    }
`;

export const StyledCard = styled(Card)`
    border-radius:12px;
    box-shadow:none;
    background-color: ${({ selectedBgColor }) => selectedBgColor || '#fff'};
`;
export const CardsStyles = styled(Card)`
    background-color: #fff;
    padding:16px 12px;
    border-radius:12px;
`;
export const MonthlySalesCard = styled(Card)`
    background-color: #dfe8ff;
    padding:16px 12px;
    border-radius:12px;
`;

export const StyledButton = styled(Button)`
    margin-left: 4px;
    box-shadow:none;
    text-transform:none;
    &.MuiButtonBase-root:focus, 
    &.MuiButtonBase-root:active {
        background-color: white !important;
        box-shadow:0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
    }
`;
export const StyledDiv = styled.div`
    display:flex;
    align-items:center;
`;
export const StyledAvatar = styled(Avatar)`
    Width:36px;
    height:36px;
`;
export const StartBox = styled(Box)`
    background-color:#fff;
    padding:8px;
    align-items:center;
    border-radius:8px;
`;

const useStyles = makeStyles((theme) => ({
    iconColor: {
        color: "#a4a1b1",
    },
    startIconColor:{
        color:"#73aed2"
    }
}));

export const Dashboard = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <StyledRoot>
            <Grid container>
                <Grid item xs={12}>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: { backgroundColor: '#7d769f' },
                        }}
                    >
                        <StyledTab label="Value comparison" icon={<Toll />} style={{ textTransform: 'none' }} />
                        <StyledTab label="Average values" icon={<EmojiSymbols />} style={{ textTransform: 'none' }} />
                        <StyledTab label="Configure analysis" icon={<SettingsOutlined />} style={{ textTransform: 'none' }} />
                        <StyledTab label="Filter analysis" icon={<FilterList />} style={{ textTransform: 'none' }} />
                    </StyledTabs>
                    <Divider />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "2rem" }}>
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid container spacing={2}>
                                    {totalScores.map((card) => (
                                        <Grid item xs={4}>
                                            <StyledCard selectedBgColor={card.title === "Total sales" ? "#d8e2fc" : card.title === "Total Orders" ? "#f9e0e1" : card.title === "Total Customers" ? "#d9e9e9" : "#fff"}>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {card.title}
                                                    </Typography>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={6}>
                                                            <Typography variant="h5"><b>{card.amount}</b></Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            {card.graph}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container alignItems="center" spacing={2}>
                                                        <Grid item >
                                                            <Typography variant="caption" color="textSecondary">
                                                                {card.caption}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <StyledSelect
                                                                selectedColor={
                                                                    card.title === "Total sales"
                                                                        ? "#1a3e72"
                                                                        : card.title === "Total Orders"
                                                                            ? "#721a1c"
                                                                            : card.title === "Total Customers"
                                                                                ? "#1a724e"
                                                                                : "#000"
                                                                }
                                                                value="13.4%"
                                                            >
                                                                <StyledMenuItem value="13.4%" >{card.percentage}</StyledMenuItem>
                                                            </StyledSelect>
                                                        </Grid>
                                                    </Grid>

                                                </CardContent>
                                            </StyledCard>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container style={{ paddingTop: "1rem" }}>
                                    <Grid item xs={12}>
                                        <CardsStyles>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item>
                                                    <Typography><b>Sales Reports</b></Typography>
                                                </Grid>
                                                <Grid item style={{ flexGrow: 1 }}>
                                                    {salesReportMonths.map((month) => (
                                                        <StyledButton variant="contained" onClick={console.log("Clicked")}>{month.month}</StyledButton>
                                                    ))}
                                                </Grid>
                                                <Grid item>
                                                    <GetApp fontSize="small" className={classes.iconColor} />
                                                </Grid>
                                                <Grid item>
                                                    <MoreHoriz fontSize="small" className={classes.iconColor} />
                                                </Grid>
                                            </Grid>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item>
                                                    <Typography variant="caption">Avg.per month</Typography>
                                                    <StyledDiv>
                                                        <Typography variant="h5"><strong>$38,500</strong></Typography>
                                                        <ArrowDropDown style={{ color: 'green', marginLeft: '4px' }} />
                                                        <ArrowDropUp style={{ color: "red", marginLeft: '-12px' }} />
                                                    </StyledDiv>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <SalesReportGraph />
                                                </Grid>
                                            </Grid>
                                        </CardsStyles>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ paddingTop: "1rem" }}>
                                    <Grid item xs={12}>
                                        <CardsStyles>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item style={{ flexGrow: 1 }}>
                                                    <Typography><b>Orders List</b></Typography>
                                                </Grid>
                                                <Grid item>
                                                    <FilterList fontSize="small" className={classes.iconColor} />
                                                </Grid>
                                                <Grid item>
                                                    <GetApp fontSize="small" className={classes.iconColor} />
                                                </Grid>
                                                <Grid item>
                                                    <MoreHoriz fontSize="small" className={classes.iconColor} />
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ paddingTop: "8px" }}>
                                                <Grid item xs={12}>
                                                    <OrderListTable
                                                        columns={orderListTableColumns}
                                                        data={orderListData}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardsStyles>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <MonthlySalesCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item style={{ flexGrow: 1 }}>
                                            <Typography><b>Monthly Sales</b></Typography>
                                        </Grid>
                                        <Grid item>
                                            <StyledSelect
                                                IconComponent={ExpandMore}
                                                value="January"
                                            >
                                                <StyledMenuItem value="January">January</StyledMenuItem>
                                                <StyledMenuItem value="February">February</StyledMenuItem>
                                            </StyledSelect>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Typography variant="caption">Total this month</Typography>
                                            <StyledDiv>
                                                <Typography variant="h5"><strong>$59,690</strong></Typography>
                                                <MonthlySalesSelect>
                                                    <StyledMenuItem value="13.4%" >13.4%</StyledMenuItem>
                                                </MonthlySalesSelect>
                                            </StyledDiv>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item>
                                            <MonthlySalesGraph />
                                        </Grid>
                                    </Grid>
                                </MonthlySalesCard>
                                
                                <MonthlySalesCard style={{marginTop:'1rem'}}>
                                    
                                        <Grid container spacing={2}>
                                            <Grid item >
                                                <StartBox >
                                                    <Star className={classes.startIconColor}/>
                                                </StartBox>
                                            </Grid>
                                            <Grid item style={{flexGrow:1}}>
                                                <Typography><b>Total Orders</b></Typography>
                                                <Typography variant="caption">Sep 01 to Oct01,2023</Typography>
                                            </Grid>
                                            <Grid item >
                                                <AvatarGroup max={3}>
                                                <StyledAvatar src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg" />
                                                <StyledAvatar src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg"/>
                                                <StyledAvatar src="https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D"/>
                                                </AvatarGroup>
                                            </Grid>
                                        </Grid>
                                   
                                </MonthlySalesCard>
                                    
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        Content for Average Values
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Content for Configurator Analysis
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Content for Filter Analysis
                    </TabPanel>
                </Grid>
            </Grid>
            </StyledRoot>
    );
}

const TabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};
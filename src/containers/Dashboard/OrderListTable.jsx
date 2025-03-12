import { Avatar, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";

export const StyledTableHead = styled(TableHead)`
   background-color:#fafafd;
   box-shadow:none;
   .MuiTableCell-root {
    padding:8px;
   }
`;
export const StyledTableCell = styled(TableCell)`
   color:grey;
`;
export const StyledTableBodyCell = styled(TableCell)`
   padding:16px 8px;
`;
export const StyledAvatar = styled(Avatar)`
   width:32px;
   height:32px;
`;
export const OrderCard = styled(Card)`
    background-color:#efeeff;
    color:#9083fc;
    box-shadow:none;
    padding:4px 8px;
    width:5rem;
`;
export const OrderText = styled(Typography)`
    font-size:14px;
    font-weight:600;
`;
export const TableBodyText = styled(Typography)`
    font-size:14px;
    color:grey
`;

export const NumberColumn = styled.div`
  border: 1px solid lightgrey;
  border-radius: 50%;
  width: 25px; 
  height: 25px;
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-size: 12px; 
  background-color: white; 
  color:#948eaf;
`;

const useStyles = makeStyles((theme) => ({
    statusIcon: {
        height: "14px",
        weight:'14px',
        marginTop:"6px"
    },
}));

export const OrderListTable = ({columns,data}) => {
    const classes = useStyles();
    return(
        <div>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        {columns.map((column)=>(
                        <StyledTableCell>{column.header}</StyledTableCell>
                        ))}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {data.map((row)=>(
                    <TableRow>
                        <StyledTableBodyCell>
                            <NumberColumn>{row.id}</NumberColumn>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <StyledAvatar 
                                    src={row.customerProfile} 
                                    alt={row.customerName}/>
                                </Grid>
                                <Grid item>
                                    <TableBodyText>{row.customerName}</TableBodyText>
                                </Grid>
                            </Grid>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                            <OrderCard>
                                <OrderText>{row.order}</OrderText>
                            </OrderCard>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                            <TableBodyText>{row.cost}</TableBodyText>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                            <TableBodyText>{row.dueDate}</TableBodyText>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                        {row.rating}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                            <Grid container alignItems="center" >
                                <Grid item>
                                    <FiberManualRecord fontSize="small" className={classes.statusIcon} style={{color: row.status === "Completed" ? "#59bf57" : row.status === "Pending" ? "#fdad80" : row.status === "Canceled" ? "#e57b81" : "#000"}}/>
                                </Grid>
                                <Grid item>
                                    <TableBodyText variant="body2" style={{color: row.status === "Completed" ? "#59bf57" : row.status === "Pending" ? "#fdad80" : row.status === "Canceled" ? "#e57b81" : "#000"}}>{row.status}</TableBodyText>
                                </Grid>
                            </Grid>
                        </StyledTableBodyCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
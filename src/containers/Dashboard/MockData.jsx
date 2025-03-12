
import React from "react";
import { TotalSalesGraph } from "./TotalSalesGraph";
import { Rating } from "@material-ui/lab";

export const totalScores =[
    {
        id:"1",
        title:"Total sales",
        amount:"$59,690",
        caption:"Since last week",
        graph:<TotalSalesGraph selectedColor="#7e98d9"/>,
        percentage:"13.4%"
    },
    {
        id:"2",
        title:"Total Orders",
        amount:"4,865",
        caption:"Since last week",
        graph:<TotalSalesGraph selectedColor="#df9da0"/>,
        percentage:"13.4%"
    },
    {
        id:"3",
        title:"Total Customers",
        amount:"2,245",
        caption:"Since last week",
        graph:<TotalSalesGraph selectedColor="#8cb3b3"/>,
        percentage:"13.4%"
    },
];

export const salesReportMonths = [
    {
        month:"12 Months"
    },
    {
        month:"6 Months"
    },
    {
        month:"30 Days"
    },
    {
        month:"7 Days"
    },

];

export const orderListTableColumns = [
    {
        id:"1",
        header:"Num"
    },
    {
        id:"2",
        header:"Customer"
    },
    {
        id:"3",
        header:"Order"
    },
    {
        id:"4",
        header:"Cost"
    },
    {
        id:"5",
        header:"Due Date"
    },
    {
        id:"6",
        header:"Rating"
    },
    {
        id:"7",
        header:"Status"
    },
];

export const orderListData = [
    {
        id:"1",
        customerName:"John C.",
        customerProfile:"https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D",
        order:"#5845-12",
        cost:"$97.50",
        dueDate:"7 feb,2023",
        rating:<Rating name="size-small" defaultValue={5} size="small" />,
        status:"Completed",
    },
    {
        id:"2",
        customerName:"Matthew K.",
        customerProfile:"https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg",
        order:"#4734-01",
        cost:"$79.90",
        dueDate:"6 feb,2023",
        rating:<Rating name="size-small" defaultValue={5} size="small" />,
        status:"Pending",
    },
    {
        id:"3",
        customerName:"Dontai G.",
        customerProfile:"https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg",
        order:"#6950-23",
        cost:"$80.40",
        dueDate:"5 feb,2023",
        rating:<Rating name="size-small" defaultValue={5} size="small" />,
        status:"Canceled",
    }
]
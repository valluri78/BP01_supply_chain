import React, {useState} from "react";
import { Typography, Paper, TablePagination, Grid } from "@material-ui/core";
import FilterdList from "../../components/TableComponent/FilterdList";
import {FilteredTable} from '../../components/Table/FilteredTable';
import { useNavigate, Link } from "react-router-dom";

export const UsersList = () =>{

    const [anchorE2, setAnchorE2] = useState({});
    const [totalCount, setTotalCount] = useState(20);
    const [pagination, setPagination] = useState({
        page: 0,
        rowsPerPage: 5,
        sortLabel: "",
        query: "",
        direction: "DESC",
    });
    const isXs = false; // Define isXs
    const isSm = false; // Define isSm

    const data = [
        { name: "John Doe", mobileNumber: "+1 123-456-7890", email: "johndoe@example.com", isActive: "Active" },
        { name: "Jane Smith", mobileNumber: "+1 987-654-3210", email: "janesmith@example.com", isActive: "Inactive" },
        { name: "Alice Johnson", mobileNumber: "+1 234-567-8901", email: "alicejohnson@example.com", isActive: "Active" },
        { name: "Bob Brown", mobileNumber: "+1 345-678-9012", email: "bobbrown@example.com", isActive: "Inactive" },
        { name: "Charlie Wilson", mobileNumber: "+1 456-789-0123", email: "charliewilson@example.com", isActive: "Active" },
        { name: "David White", mobileNumber: "+1 567-890-1234", email: "davidwhite@example.com", isActive: "Inactive" },
        // { name: "Emma Harris", mobileNumber: "+1 678-901-2345", email: "emmaharris@example.com", isActive: "Active" },
        // { name: "Frank Martin", mobileNumber: "+1 789-012-3456", email: "frankmartin@example.com", isActive: "Inactive" },
        // { name: "Grace Lee", mobileNumber: "+1 890-123-4567", email: "gracelee@example.com", isActive: "Active" },
        // { name: "Henry Adams", mobileNumber: "+1 901-234-5678", email: "henryadams@example.com", isActive: "Inactive" },
        // { name: "Ivy Carter", mobileNumber: "+1 012-345-6789", email: "ivycarter@example.com", isActive: "Active" },
        // { name: "Jack Green", mobileNumber: "+1 111-222-3333", email: "jackgreen@example.com", isActive: "Inactive" },
        // { name: "Kelly Baker", mobileNumber: "+1 222-333-4444", email: "kellybaker@example.com", isActive: "Active" },
        // { name: "Liam Scott", mobileNumber: "+1 333-444-5555", email: "liamscott@example.com", isActive: "Inactive" },
        // { name: "Mia Turner", mobileNumber: "+1 444-555-6666", email: "miaturner@example.com", isActive: "Active" },
        // { name: "Noah Phillips", mobileNumber: "+1 555-666-7777", email: "noahphillips@example.com", isActive: "Inactive" },
        // { name: "Olivia Hall", mobileNumber: "+1 666-777-8888", email: "oliviahall@example.com", isActive: "Active" },
        // { name: "Paul Evans", mobileNumber: "+1 777-888-9999", email: "paulevans@example.com", isActive: "Inactive" },
        // { name: "Quinn Ramirez", mobileNumber: "+1 888-999-0000", email: "quinnramirez@example.com", isActive: "Active" },
        // { name: "Ryan Torres", mobileNumber: "+1 999-000-1111", email: "ryantorres@example.com", isActive: "Inactive" }
    ];
    // const usersColumns = [
    //     {
    //         id: 'name',
    //         label: 'Name',
    //         type: 'text',
    //         customColumns: ['name'],
    //         width: "100%",
    //         customCell: (name, id) => { return <Link tabIndex={0} >Hiii</Link>; },
    //     },
    //     // {
    //     //     id: 'address',
    //     //     label: 'Address',
    //     //     type: 'text',
    //     //     width: isXs || isSm ? "50%" : "100%",
    //     // },
    //     // {
    //     //     id: 'unitsCount',
    //     //     label: 'Units',
    //     //     type: 'text',
    //     //     align: "right",
    //     //     alignText: 'right',
    //     //     format: (value) => value.toLocaleString('en-US'),
    //     //     width: isXs || isSm ? "50%" : "100%",
    //     // },

    // ];

    const sampleData = [
        { id: 1, name: "Alice", age: 25, city: "New York" },
        { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
        { id: 3, name: "Charlie", age: 28, city: "Chicago" },
        { id: 4, name: "David", age: 35, city: "Houston" },
        { id: 5, name: "Eva", age: 22, city: "San Francisco" },
      ];
    const usersColumns =  [
        { id: "id", label: "ID" },
        { id: "name", label: "Name" },
        { id: "age", label: "Age" },
        { id: "city", label: "City" },
      ];
    const headers = [ 
        { id: "name", value: "Name", sort: true ,required:true},
        { id: "email", value: "Email", sort: true ,required:true,type:"email"},
    ]

    
    const navigate = useNavigate();
    
    const openActionsMenu = (event, zoneCode) => {
        setAnchorE2((prevAnchorE2) => ({
            ...prevAnchorE2,
            [zoneCode]: event.currentTarget,
        }));
    };
    const closeActionsMenu = (zoneCode) => {
        setAnchorE2((prevAnchorE2) => ({
            ...prevAnchorE2,
            [zoneCode]: null,
        }));
    };
    const deleteEntry = (data, identifier, value) => {
        return data.filter(entry => entry[identifier] !== value);
    };
    const handleChangePage = (event, newPage) => {
        setPagination({ ...pagination, page: newPage });
    };
    const handleChangeRowsPerPage = (event) => {
        setPagination({
            ...pagination,
            page: 0,
            rowsPerPage: event.target.value,
        });
    };
    const handleDivisionHyperlinkClick = async (event) => {
        navigate("/division");
    };
    const actions = []
    const stickyColumn = {
        rightCount: 1,
        leftCount: 0,
        rightZ: 0
    };
    return (
      <div style={{ padding: "34px" }}>
        <Paper>
        {/* <FilterdList
          headers={headers}
          data={mockData}
          anchorEl={anchorE2}
          onOpenMenuActions={openActionsMenu}
          onCloseMenuActions={closeActionsMenu}
          onDelete={deleteEntry}
          sortDirection={pagination.direction}
          page={pagination.page}
          rowsPerPage={pagination.rowsPerPage}
          onHyperLinkCallback1={handleDivisionHyperlinkClick}
        />
        {mockData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={totalCount}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )} */}
        <FilteredTable
        
        />
        </Paper>
        
      </div>
    );
}
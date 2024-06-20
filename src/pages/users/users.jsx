/*import React from 'react'
import Page from '../../layouts/Page/Page'
// mui styling library
// username->driver
// trips details-> no of trips
// no vehicle used.
// email
// phone
// button
//function
function Users() 
 {
  return (
    <Page>
     <h1>Users</h1>
   </Page>
   )
 }

export default Users
*/
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Page from "../../layouts/Page/Page";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./users.css";
import { colors } from "../../assets";

function createData(userName, vehicleName, vehicleNo, noOfTrips, ratings) {
  return { userName, vehicleName, vehicleNo, noOfTrips, ratings };
}

const rows = [
  createData("Ramish", "camry", "pak001", 5, 3),
  createData("Ramish", "camry", "pak001", 5, 3),
  createData("Ramish", "camry", "pak001", 5, 3),
  createData("Ramish", "camry", "pak001", 5, 3),
  createData("Ramish", "camry", "pak001", 5, 3),
  createData("Ramish", "camry", "pak001", 5, 3),
];

export default function Users() {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="pageHeader">
        <h1>Users (Drivers)</h1>
        <div className="headerActions">
          <Button
            sx={{
              bgcolor: colors.primary,
              borderRadius: "10px",
              "&:hover": {
                opacity: 0.9,
                bgcolor: colors.primary,
              },
            }}
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("/users/register")}
          >
            New User
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Driver Name</TableCell>
              <TableCell align="right">Vehicle Name</TableCell>
              <TableCell align="right">Vehicle Number</TableCell>
              <TableCell align="right">No of Trips</TableCell>
              <TableCell align="right">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="right">{row.vehicleName}</TableCell>
                <TableCell align="right">{row.vehicleNo}</TableCell>
                <TableCell align="right">{row.noOfTrips}</TableCell>
                <TableCell align="right">{row.ratings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}

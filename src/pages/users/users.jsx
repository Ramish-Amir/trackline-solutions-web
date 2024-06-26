import React, { useEffect, useState } from "react";
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
import { getAllUsers } from "../../api/users";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      setUsers(res);
    };
    fetchUsers();
  }, []);
  
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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>No of Trips</TableCell>
              <TableCell>No of Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.totalTrips}</TableCell>
                <TableCell>{row.totalVehicles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}

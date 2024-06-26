import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Page from "../../layouts/Page/Page";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./users.css";
import { colors } from "../../assets";
import { deleteUserWithId, getAllUsers } from "../../api/users";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserWithId(id);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1>Users</h1>
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

      <TableContainer>
        <Table
          className="vehicle-table"
          sx={{ backgroundColor: "white", minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>No of Trips</TableCell>
              <TableCell>No of Vehicles</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.totalTrips}</TableCell>
                <TableCell>{user.totalVehicles}</TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteUser(user?.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}

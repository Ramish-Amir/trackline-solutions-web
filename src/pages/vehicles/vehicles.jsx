import Page from "../../layouts/Page/Page";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./vehicles.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";

const Vehicle = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([
    { username: "John Doe", vehicleNumber: "ABC123", id: 1 },
    { username: "Jane Smith", vehicleNumber: "XYZ456", id: 2 },
  ]);

  return (
    <Page>
      <div className="pageHeader">
        <h1>Vehicles</h1>
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
            startIcon={<AddIcon />}
            onClick={() => navigate("/vehicles/register")}
          >
            New Vehicle
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table className="vehicle-table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Vehicle Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.username}</TableCell>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default Vehicle;

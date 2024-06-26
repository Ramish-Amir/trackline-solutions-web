import Page from "../../layouts/Page/Page";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./vehicles.css";
import AddIcon from "@mui/icons-material/Add";
import { Button, Paper } from "@mui/material";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";
import { getAllVehicles } from "../../api/vehicle";

const Vehicle = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await getAllVehicles();
      setVehicles(res);
    };
    fetchVehicles();
  }, []);

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
        <Table
          className="vehicle-table"
          sx={{ backgroundColor: "white", minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Year of Manufacture</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Total Trips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.company}</TableCell>
                <TableCell>{vehicle.vehicleRegistrationNo}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.yearOfManufacture}</TableCell>
                <TableCell>{vehicle.ownerName}</TableCell>
                <TableCell>{vehicle.vehicleTotalTrips}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default Vehicle;

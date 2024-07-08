import Page from "../../layouts/Page/Page";
import { getAllTrips } from "../../api/trips";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./trips.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";
import { deleteVehicle, getAllVehicles } from "../../api/vehicle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Trips = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const trips = await getAllTrips();
    console.log("TRIPs >> ", trips);
    setTrips(trips);
  };

  // const handleDeleteVehicle = async (ownerId, vehicleId) => {
  //   try {
  //     await deleteVehicle(ownerId, vehicleId);
  //     await fetchVehicles();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.make}</TableCell>
                <TableCell>{trip.company}</TableCell>
                <TableCell>{trip.vehicleRegistrationNo}</TableCell>
                <TableCell>{trip.fuelType}</TableCell>
                <TableCell>{trip.yearOfManufacture}</TableCell>
                <TableCell>{trip.ownerName}</TableCell>
                <TableCell>{trip.vehicleTotalTrips}</TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    // onClick={() =>
                    //   handleDeleteVehicle(vehicle?.ownerId, vehicle?.id)
                    // }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default Trips;

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
              <TableCell>Owner Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Starting Address</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Ending Address</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Vehicle Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{(trip.ownerName)}</TableCell>
                <TableCell>{trip.duration}</TableCell>
                <TableCell>{trip.startingAddress}</TableCell>
                <TableCell>{new Date(trip.startingTime *1000).toLocaleString()}</TableCell>
                <TableCell>{trip.endingAddress}</TableCell>
                <TableCell>{new Date(trip.endingTime*1000).toLocaleString()}</TableCell>
                <TableCell>{trip.company}</TableCell>
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

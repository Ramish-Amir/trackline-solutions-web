import Page from '../../layouts/Page/Page'
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './vehicles.css';
import React, { useEffect, useState } from "react";
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
import { deleteVehicle, getAllVehicles } from "../../api/vehicle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";
import EditIcon from '@mui/icons-material/Edit';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([
    { username: 'Naman Goyal', vehicleNumber: 'ABC123', id: 1 },
    { username: 'Jane Smith', vehicleNumber: 'XYZ456', id: 2 },
  ]);

  return (
    <Page>
      <h1>Registered Vehicles</h1>
      <TableContainer>
        <Table className="vehicle-table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Registration No</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Year of Manufacture</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Total Trips</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.username}</TableCell>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.company}</TableCell>
                <TableCell>{vehicle.vehicleRegistrationNo}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.yearOfManufacture}</TableCell>
                <TableCell>{vehicle.ownerName}</TableCell>
                <TableCell>{vehicle.vehicleTotalTrips}</TableCell>
                <TableCell>
                  <EditIcon
                    sx={{ color: "blue", cursor: "pointer", padding: "1px" }}
                    onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)}
                  />
                  <DeleteOutlineIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteVehicle(vehicle?.ownerId, vehicle?.id)}
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
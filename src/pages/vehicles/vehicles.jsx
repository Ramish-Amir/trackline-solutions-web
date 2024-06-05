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

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([
    { username: 'John Doe', vehicleNumber: 'ABC123', id: 1 },
    { username: 'Jane Smith', vehicleNumber: 'XYZ456', id: 2 },
  ]);

  return (
    <Page>
      <h1>Registed Vehicles</h1>
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
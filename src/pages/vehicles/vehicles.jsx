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
import { Button } from "@mui/material";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";
import { deleteVehicle, getAllVehicles } from "../../api/vehicle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";

const Vehicle = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getAllVehicles();
      setVehicles(res);
    } catch (err) {
      enqueueSnackbar("Ann error occured while deleting vehicle", {
        variant: "error",
        ...snackbarBaseOptions,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (ownerId, vehicleId) => {
    try {
      await deleteVehicle(ownerId, vehicleId);
      enqueueSnackbar("Vehicle deleted successfully", {
        variant: "success",
        ...snackbarBaseOptions,
      });
      await fetchVehicles();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ann error occured while deleting vehicle", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    }
  };

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
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              >
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.company}</TableCell>
                <TableCell>{vehicle.vehicleRegistrationNo}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.yearOfManufacture}</TableCell>
                <TableCell>{vehicle.ownerName}</TableCell>
                <TableCell>{vehicle.vehicleTotalTrips}</TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() =>
                      handleDeleteVehicle(vehicle?.ownerId, vehicle?.id)
                    }
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

export default Vehicle;

import React, { useEffect, useState } from "react";
import Page from "../../layouts/Page/Page";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { assets, colors } from "../../assets";
import { getTripDetails } from "../../api/trips";
import TripMap from "../../components/TripMap/TripMap.jsx";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import { Box } from "@mui/material";
import "./tripDetails.css";
import { getFormattedTime } from "../../utils/timeConversions.js";
function TripDetails() {
  const navigate = useNavigate();
  const { ownerId, vehicleId, tripId } = useParams();
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async (ownerId, vehicleId, tripId) => {
      try {
        setLoading(true);
        const tripDetails = await getTripDetails(ownerId, vehicleId, tripId);
        console.log("TRIP DETAILS >> ", tripDetails);
        setTrip(tripDetails);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails(ownerId, vehicleId, tripId);
  }, []);
  const timestampToMilliseconds = (timestamp) => {
    return timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  };

  // Function to format the time difference
  const formatTimeDifference = (startTimestamp, endTimestamp) => {
    const startTime = timestampToMilliseconds(startTimestamp);
    const endTime = timestampToMilliseconds(endTimestamp);

    const diffInMs = endTime - startTime;

    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    const timeParts = [];
    if (hours > 0) timeParts.push(`${hours} hrs`);
    if (minutes > 0) timeParts.push(`${minutes} min`);
    if (seconds > 0 || timeParts.length === 0) timeParts.push(`${seconds} sec`);

    return timeParts.join(" ");
  };
  if (!trip) {
    return <p>Trip details are not available</p>;
  }

  return (
    <Page>
      <div className="pageHeader">
        <h1>Trip Details</h1>
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
            // startIcon={<AddIcon />}
            onClick={() => navigate("/trips")}
          >
            Show All Trips
          </Button>
        </div>
      </div>

      <div className="tripDetailContainer">
        <div className="tripDetailsCard">
          <div className="item-icon">
            <MyLocationIcon />
            <span>
              {" "}
              {trip.startingAddress}
              <div className="tripCardTime">
                {getFormattedTime(trip.startingTime)}
              </div>
            </span>
          </div>
          <div className="vertical-dash-line"></div>
          <div className="item-icon">
            <PlaceIcon />
            <div>
              {trip.endingAddress}
              <div className="tripCardTime">
                {getFormattedTime(trip.endingTime)}
              </div>
            </div>
          </div>
          <div className="tripDetailsDistanceTime">
            <div className="tripDistance">
              Distance: {trip.distance.toFixed(2)} km
            </div>
            <div className="tripTime">
              Time Taken:{" "}
              {formatTimeDifference(trip.startingTime, trip.endingTime)}
            </div>
          </div>
        </div>
        <div className="tripDetailsCard">
          <div className="tripMetaRow">
            <div>
              <div className="metaTitle">Vehicle Details:</div>
              <span>
                {trip.vehicle.make} {trip.vehicle.company}
              </span>
              <div className="tripCardTime">
                {trip.vehicle.yearOfManufacture} -{" "}
                {trip.vehicle.vehicleRegistrationNo}
              </div>
            </div>
            <img
              className="tripDetailImage"
              src={assets.carProfilePciture}
              alt={trip.ownerName}
            />
          </div>
          <div className="tripMetaRow">
            <div>
              <div className="metaTitle">Owner Details:</div>
              <span>{trip.ownerName}</span>
              <div className="tripCardTime">{trip.owner.email}</div>
            </div>
            <img
              className="tripDetailImage"
              src={assets.profilePicture}
              alt={trip.ownerName}
            />
          </div>
        </div>
      </div>

      {/* <p>You can view your trip details once this feature is ready...</p> */}

      <h3>Trip Map</h3>
      {trip && (
        <TripMap
          encodedString={trip?.encodedPoints}
          startingAddress={trip.startingAddress}
          endingAddress={trip.endingAddress}
        />
      )}
    </Page>
  );
}

export default TripDetails;

import React, { useEffect, useState } from "react";
import Page from "../../layouts/Page/Page";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../assets";
import { getTripDetails } from "../../api/trips";
import TripMap from "../../components/TripMap/TripMap.jsx";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import {  Box } from '@mui/material';
import './tripDetails.css';
function TripDetails() {
  const navigate = useNavigate();
  const { ownerId, vehicleId, tripId } = useParams();
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async (ownerId, vehicleId, tripId) => {
      try
       {
         setLoading(true);
         const tripDetails = await getTripDetails(ownerId, vehicleId, tripId);
         console.log("  >>> ", tripDetails);
         setTrip(tripDetails);
       } 
      catch (err)
        {
         console.log(err);
         throw err;
        }
      finally 
        {
         setLoading(false);
        }
    };
    fetchTripDetails(ownerId, vehicleId, tripId);
  }, []);
  const timestampToMilliseconds = (timestamp) => {
    return timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  };
  
  // Function to format the time difference

  function formatTimestamp(seconds, nanoseconds) {
    // Convert seconds and nanoseconds to milliseconds
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    
    // Create a Date object
    const date = new Date(milliseconds);
    
    // Define options for date formatting
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    // Format the date using the options
    const formattedDate = date.toLocaleString('en-US', options);
    console.log('formatted date: ',formattedDate)
    // Custom formatting to match the desired output
    // Split the formatted date into date and time parts
    const [datePart, timePart, clock] = formattedDate.split(', ');
  
    // Reformat time to uppercase 'AM'/'PM'
    console.log('time part:',timePart);
    const timeParts = timePart.split(' ');
    const timeFormatted = `${timeParts[0]} , ${clock} `;

    return `${datePart} ${timeFormatted}`;
  }

  const formatTimeDifference = (startTimestamp, endTimestamp) => {
    const startTime = timestampToMilliseconds(startTimestamp);
    const endTime = timestampToMilliseconds(endTimestamp);
  
    const diffInMs = endTime - startTime;
  
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
  
    const timeParts = [];
    if (hours > 0) timeParts.push(`${hours} hours`);
    if (minutes > 0) timeParts.push(`${minutes} minutes`);
    if (seconds > 0 || timeParts.length === 0) timeParts.push(`${seconds} seconds`);
  
    return timeParts.join(', ');
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

      <div className="tripDetailsCard">
          <div className="date">{formatTimestamp(trip.startingTime.seconds ,trip.startingTime.nanoseconds)}</div>
          {/* <div className="tripDetailsContent"> */}
            <div className="item-icon">{<MyLocationIcon />} <span> {trip.startingAddress}</span></div>      
          {/* </div> */}
          <div className="vertical-dash-line"></div>
          {/* <div  className="tripDetailsContent"> */}
            <div className="item-icon">{<PlaceIcon/>} <span>  {trip.endingAddress}</span></div>   
          {/* </div> */}
        <div className="tripDetailsDistanceTime">
          <div className="tripDistance">
            Distance: {trip.distance.toFixed(2)} km
          </div>
          <div className="tripTime">
            Time Taken: {formatTimeDifference(trip.startingTime, trip.endingTime)}
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

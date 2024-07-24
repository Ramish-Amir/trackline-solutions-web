import React, { useEffect, useState } from "react";
import Page from "../../layouts/Page/Page";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../assets";
import { getTripDetails } from "../../api/trips";
import TripMap from "../../components/TripMap/TripMap.jsx";

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

      <div style={{
          backgroundColor: '#DDDDDD',
          color: '#004040',
          borderRadius: '15px',
          padding: '20px',
          margin: '15px',
          width: '60%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}>
          <div style={{
            marginBottom: '15px',
            padding: '10px',
            backgroundColor:'#DDDDDD',
            borderRadius: '10px',
            textAlign: 'start',
            fontSize: '18px',
          }}>
       <img src="/static/media/start.jpg" alt="start address" style={{ width: '24px', height: '24px', marginRight: '10px' }} ></img>
       {trip.startingAddress}
    </div>
    <div style={{
      marginBottom: '15px',
      padding: '10px',
      backgroundColor:'#DDDDDD',
      borderRadius: '10px',
      textAlign: 'start',
      fontSize: '18px',
    }}>
      <img src="/static/media/end.jpg" alt="end address" style={{ width: '24px', height: '24px', marginRight: '10px' }} ></img>
       {trip.endingAddress}
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#003030',
      borderRadius: '10px',
      padding: '10px',
    }}>
      <div style={{
        flex: 1,
        color:'#DDDDDD',
        textAlign: 'center',
        borderRight: '1px solid #DDDDDD',
        paddingRight: '10px',
      }}>
        Distance: {trip.distance.toFixed(2)} km
      </div>
      <div style={{
        flex: 1,
        color:'#DDDDDD',
        textAlign: 'center',
        paddingLeft: '10px',
      }}>
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

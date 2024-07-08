import React, { useEffect } from "react";
import Page from "../../layouts/Page/Page";
import { getAllTrips } from "../../api/trips";

function Trips() {
  useEffect(() => {
    const fetchTrips = async () => {
      const trips = await getAllTrips();
      console.log('TRIPs >> ', trips)
    }
    fetchTrips()
  }, [])
  return (
    <Page>
      <h1>Trips</h1>
      <h3>In progress...</h3>
    </Page>
  );
}

export default Trips;

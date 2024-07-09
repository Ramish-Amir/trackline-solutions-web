import React from "react";
import Page from "../../layouts/Page/Page";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../assets";

function TripDetails() {
  const navigate = useNavigate();
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

      <p>You can view your trip details once this feature is ready...</p>
    </Page>
  );
}

export default TripDetails;

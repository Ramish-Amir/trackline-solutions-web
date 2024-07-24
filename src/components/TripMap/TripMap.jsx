import React, { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { colors } from "../../assets";
import { decodePolylineString, getPolylineCenter } from "./tripMap";
import AddressMarker from "./AddressMarker/AddressMarker";
import CoordinateMarker from "./CoordinateMarker/CoordinateMarker";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  border: `2px solid ${colors.primary}`,
};

const mapOptions = {
  disableDefaultUI: true,
};

const TripMap = ({ encodedString, zoom, startingAddress, endingAddress }) => {
  const mapRef = useRef();
  const [center, setCenter] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [decodedPath, setDecodedPath] = useState();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    setDecodedPath(decodePolylineString(encodedString));
  }, [encodedString]);

  useEffect(() => {
    if (decodedPath && !center) {
      setCenter(
        getPolylineCenter(decodedPath[0], decodedPath[decodedPath.length - 1])
      );
    }
  }, [decodedPath]);

  useEffect(() => {
    if (mapLoaded && decodedPath && mapRef.current) {
      const borderPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "black",
        // strokeColor: "#00008B",
        strokeOpacity: 1.0,
        strokeWeight: 8, // Border width
      });

      const innerPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "black",
        // strokeColor: "blue",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      borderPath.setMap(mapRef.current);
      innerPath.setMap(mapRef.current);

      return () => {
        borderPath.setMap(null);
        innerPath.setMap(null);
      };
    }
  }, [mapLoaded, decodedPath]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom || 15}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {decodedPath && (
        <>
          <OverlayView
            position={decodedPath[0]}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <>
              <AddressMarker
                type={"origin"}
                address={startingAddress || "Starting address"}
              />
              <CoordinateMarker type={"origin"} />
            </>
          </OverlayView>
          <OverlayView
            position={decodedPath[decodedPath.length - 1]}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <>
              <AddressMarker
                type={"end"}
                address={endingAddress || "Ending address"}
              />
              <CoordinateMarker type={"end"} />
            </>
          </OverlayView>
        </>
      )}
    </GoogleMap>
  );
};

export default React.memo(TripMap);

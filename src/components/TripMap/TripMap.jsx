import React, { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { colors } from "../../assets";
import { decodePolylineString, getPolylineCenter } from "./tripMap";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  border: `2px solid ${colors.primary}`,
};

const mapOptions = {
  disableDefaultUI: true,
};

const TripMap = ({ encodedString, zoom }) => {
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
        strokeColor: "#00008B", // Dark blue border
        strokeOpacity: 1.0,
        strokeWeight: 8, // Border width
      });

      const innerPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "blue", // Light blue inner color
        strokeOpacity: 1.0,
        strokeWeight: 4, // Inner width
      });

      borderPath.setMap(mapRef.current);
      innerPath.setMap(mapRef.current);

      return () => {
        borderPath.setMap(null);
        innerPath.setMap(null);
      };
    }
  }, [mapLoaded, decodedPath]);

  // useEffect(() => {
  //   if (mapLoaded && decodedPath && mapRef.current) {
  //     // const flightPath = new window.google.maps.Polyline({
  //     //   path: decodedPath,
  //     //   geodesic: true,
  //     //   strokeColor: "blue",
  //     //   strokeOpacity: 1.0,
  //     //   strokeWeight: 5,
  //     // });

  //     // flightPath.setMap(mapRef.current);

  //     return () => {
  //       flightPath.setMap(null);
  //     };
  //   }
  // }, [mapLoaded, decodedPath]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom || 15}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  );
};

export default React.memo(TripMap);

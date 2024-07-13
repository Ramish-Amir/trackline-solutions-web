import React, { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapWithPolyline = () => {
  const mapRef = useRef();
  const [center, setCenter] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const getCenter = (start, end) => ({
    lat: (start.lat + end.lat) / 2,
    lng: (start.lng + end.lng) / 2,
  });

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    setMapLoaded(true); // Set mapLoaded to true when map is loaded
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const polylinePoints =
    "erecF|wrhVUdAUbA[~@YA_@~@_@z@a@z@a@z@c@|@c@z@c@|@a@~@c@~@]~@[bAWdAUdAQdAOhAKfAIhAGfAEfAAhAChAEhACfAEhAGhAIdAKdAOfAQbAUbAUbAWbA[~@]z@_@z@a@z@e@x@e@t@g@t@i@r@k@n@m@l@m@n@m@l@q@l@m@l@";

  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return points;
  };

  const decodedPath = decodePolyline(polylinePoints);

  useEffect(() => {
    if (decodedPath) {
      setCenter(
        getCenter(decodedPath[0], decodedPath[decodedPath?.length - 1])
      );
    }
  }, [decodedPath]);

  useEffect(() => {
    if (mapLoaded && decodedPath) {
      const flightPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 5,
      });

      flightPath.setMap(mapRef.current);

      return () => {
        flightPath.setMap(null);
      };
    }
  }, [mapLoaded, decodedPath]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      mapTypeId="terrain"
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  );
};

export default React.memo(MapWithPolyline);

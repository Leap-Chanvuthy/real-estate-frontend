import React, { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";

const Location = ({ latitude, longitude }) => {
  useEffect(() => {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  }, [latitude, longitude]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08",
  });

  // Ensure latitude and longitude are numbers
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Memoize center to prevent unnecessary re-renders
  const center = useMemo(() => {
    if (lat && lng) {
      return { lat, lng };
    }
    // Return a default center if latitude or longitude is not valid
    return { lat: 0, lng: 0 }; // Replace with your default coordinates
  }, [lat, lng]);

  if (loadError) {
    return <div>Error loading map</div>;
  }

  return (
    <div style={{ height: "40vh", width: "100%", borderRadius: "15px", overflow: "hidden" }}>
      {!isLoaded ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          height="100%"
          width="100%"
          style={{ borderRadius: "15px" }}
        />
      ) : (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={3} // Adjust zoom level as per your requirement
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Location;


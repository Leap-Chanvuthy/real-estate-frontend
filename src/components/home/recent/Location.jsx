// import React, { useMemo, useEffect } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import Skeleton from "@mui/material/Skeleton";

// const Location = ({ latitude, longitude }) => {
//   useEffect(() => {
//     console.log("Latitude:", latitude);
//     console.log("Longitude:", longitude);
//   }, [latitude, longitude]);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08",
//   });

//   // Ensure latitude and longitude are numbers
//   const lat = Number(latitude);
//   const lng = Number(longitude);

//   // Memoize center to prevent unnecessary re-renders
//   const center = useMemo(() => {
//     if (lat && lng) {
//       return { lat, lng };
//     }
//     // Return a default center if latitude or longitude is not valid
//     return { lat: 0, lng: 0 }; // Replace with your default coordinates
//   }, [lat, lng]);

//   if (loadError) {
//     return <div>Error loading map</div>;
//   }

//   return (
//     <div style={{ height: "40vh", width: "100%", borderRadius: "15px", overflow: "hidden" }}>
//       {!isLoaded ? (
//         <Skeleton
//           variant="rectangular"
//           animation="wave"
//           height="100%"
//           width="100%"
//           style={{ borderRadius: "15px" }}
//         />
//       ) : (
//         <GoogleMap
//           mapContainerStyle={{ height: "100%", width: "100%" }}
//           center={center}
//           zoom={3} // Adjust zoom level as per your requirement
//         >
//           <Marker position={center} />
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default Location;


import React, { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";
import { AiFillPropertySafety } from "react-icons/ai";
import { BASE_IMAGE_URL } from "../../../constants/const";

const Location = ({ latitude, longitude , property }) => {
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

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

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
          zoom={9} // Adjust zoom level as per your requirement
        >
          <Marker
            position={center}
            onClick={() => setInfoWindowOpen(true)}
          >
            {infoWindowOpen && (
              <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-md font-bold">{property.property_type.name}</h4>
                  <p>${property.price}</p>
                  <p>Dummy text about the property. Replace with actual details later.</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      )}
    </div>
  );
};

export default Location;


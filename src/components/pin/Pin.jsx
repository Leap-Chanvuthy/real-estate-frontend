import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  const { latitude, longitude } = item.property_location;
  console.log("Pin location:", latitude, longitude); // Add this line

  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        <div className="popupContainer">
          {item.property_images.length > 0 && <img src={item.property_images[0].image} alt="" />}
          <div className="textContainer">
            <Link to={`/${item.id}`}>Price: ${item.price}</Link>
            <span className="font-bold">{item.badge}</span>
            <span>{item.number_of_bedrooms} bedroom(s)</span>
            <b>${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

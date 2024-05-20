import { Link } from "react-router-dom";
import "./card.scss";

function Card({ property }) {
  const image = property.property_images.length > 0 ? property.property_images[0].image : "https://img.freepik.com/premium-vector/real-estate-business-concept-with-houses-real-estate-market-growth-flat-modern-design-illustration_566886-594.jpg";

  return (
    <div className="card">
      <Link to={`/${property.id}`} className="imageContainer">
        <img src={image} alt="Property" className="border-2 border-gray-500" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${property.id}`}>{property.badge}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location Pin" />
          <span>{property.property_location ? `${property.property_location.city.name}, ${property.property_location.country.name}` : <p className="text-red-400">Location not available</p>}</span>
        </p>
        <p className="price">$ {property.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bedroom Icon" />
              <span>{property.number_of_bedrooms} bedroom{property.number_of_bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bathroom Icon" />
              <span>{property.number_of_bathrooms} bathroom{property.number_of_bathrooms > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save Icon" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

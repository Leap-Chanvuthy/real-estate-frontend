import { Link } from "react-router-dom";
import "./card.scss";

function Card({ property }) {
  return (
    <div className="card">
      <Link to={`/${property.id}`} className="imageContainer">
        <img src={property.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${property.id}`}>{property.badge}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>"Location"</span>
        </p>
        <p className="price">$ {property.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{property.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{property.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

import { Link } from "react-router-dom";

const RelatedProperty = ({properties}) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Related Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {properties.data?.related_properties?.map((property) => (
          <div
            key={property.id}
            className="bg-white border-2 rounded-lg overflow-hidden"
          >
            <Link to={`/property/${property.id}}`}>
              <img
                src={
                  property.property_images.length > 0
                    ? property.property_images[0].image
                    : "https://via.placeholder.com/640x480.png"
                }
                alt="Property"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {property.property_type.name}
                </h3>
                <p className="text-gray-600">
                  {property.property_location.city.name},{" "}
                  {property.property_location.district.name}
                </p>
                <p className="text-gray-800 mt-2">${property.price}</p>
                <p className="text-gray-600">{property.badge}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProperty;


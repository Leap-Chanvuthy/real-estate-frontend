import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesFailure,
  fetchPropertiesStart,
  fetchPropertiesSuccess,
} from "../../../redux/slice/propertiesSlice";
import Review from "./Review";
import { BASE_IMAGE_URL, BASE_URL } from "../../../constants/const";
import ReviewList from "./ReviewList";
import ImageSlider from "../../common/ImageSlider";

const Detail = () => {
  const { id } = useParams();
  const { properties, error, loading } = useSelector(
    (state) => state.properties
  );
  const dispatch = useDispatch();

  console.log(properties);

  useEffect(() => {
    const getPropertyDetail = async () => {
      try {
        dispatch(fetchPropertiesStart());
        const response = await axios.get(`${BASE_URL}/properties/${id}`);
        if (response.status === 200) {
          dispatch(fetchPropertiesSuccess(response.data));
        } else {
          throw new Error("Failed to fetch property details");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        dispatch(fetchPropertiesFailure(error.message));
      }
    };
    getPropertyDetail();
  }, [id, dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  const property = properties.data && properties.data;
  console.log("property:", property);

  return (
    <div className="w-full flex flex-col gap-3 bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image List Horizontal Scroll */}
        <ImageSlider />
        {/* <div className="flex overflow-x-scroll p-6 space-x-4">
          {property?.property_images?.map((image, index) => (
            <img
              key={index}
              src={`${BASE_IMAGE_URL}/storage/${image.image}`}
              alt={`Property Image ${index + 1}`}
              className="h-96 object-cover flex-shrink-0"
            />
          ))}
        </div> */}

        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-800">
            {property?.property?.property_type?.name}
          </h1>
          <div className="bg-orange-100 px-3 py-2 mt-3 w-[13rem] rounded-md font-bold text-orange-400">
            <p>{property?.property.badge}</p>
          </div>
          <p className="text-gray-600 mt-4">{property?.description}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Price</h2>
              <p className="text-gray-600 mt-2">${property?.property?.price}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Location</h2>
              <p className="text-gray-600 mt-2">
                {property?.property?.property_location?.city?.name}, {property?.property?.property_location?.district?.name}, {property?.property?.property_location?.village?.name}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Area</h2>
              <p className="text-gray-600 mt-2">
                Area : {property?.property.area} 
              </p>
              <p className="text-gray-600 mt-2">
                Facing : {property?.property?.facing}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                License Type
              </h2>
              <p className="text-gray-600 mt-2">{property?.property.license}</p>
            </div>
            {property?.land?.land_type !== null && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Features
                </h2>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_bathrooms} Bath Rooms
                </p>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_bedrooms} Bed Rooms
                </p>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_car_spaces} Car Space
                </p>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_floors} Floors
                </p>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_guestroom} Guest Rooms
                </p>
                <p className="text-gray-600 mt-2">
                  {property?.property?.features?.number_of_kitchens} Kitchens
                </p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Contact Info
              </h2>
              <p className="text-gray-600 mt-2">Contact Person : {property?.property?.agent?.name}</p>
              <p className="text-gray-600 mt-2">Company : {property?.property?.agent?.company_name}</p>
              <p className="text-gray-600 mt-2">Email : {property?.property?.agent?.email}</p>
              <p className="text-gray-600 mt-2">Phone Number : {property?.property?.agent?.phone_number}</p>
            </div>
            {property?.land?.land_type === null && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Property
                </h2>
                <ul className="text-gray-600 mt-2 grid grid-cols-2">
                  <li>Bedrooms : {property?.number_of_bedrooms}</li>
                  <li>Floor : {property?.number_of_floors}</li>
                  <li>Bathroom : {property?.number_of_bathrooms}</li>
                  <li>Car Space: {property?.number_of_car_spaces}</li>
                  <li>Kitchen : {property?.number_of_kitchens}</li>
                  <li>Guestroom : {property?.number_of_guestroom}</li>
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Land Type
              </h2>
              <p className="text-gray-600 mt-2">{property?.property?.land_type}</p>
            </div>

          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Related Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {properties.data?.related_properties?.map((relatedProperty) => (
                <Link
                  to={`/property/${relatedProperty.id}`}
                  key={relatedProperty.id}
                >
                  <div className="bg-white border-2 rounded-lg overflow-hidden">
                    <img
                      src={
                        relatedProperty.property_images.length > 0
                          ? relatedProperty.property_images[0].image
                          : "https://via.placeholder.com/640x480.png"
                      }
                      alt="Property"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        {relatedProperty.property_type?.name}
                      </h3>
                      <p className="text-gray-600">
                        {relatedProperty.property_location.city.name},{" "}
                        {relatedProperty.property_location.district.name}
                      </p>
                      <p className="text-gray-800 mt-2">
                        ${relatedProperty.price}
                      </p>
                      <div className="bg-orange-100 px-3 py-2 mt-3 w-[8rem] rounded-md font-bold text-orange-400">
                        <p>{relatedProperty.badge}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mx-auto  overflow-hidden">
          <Review property_id={{ id }} />
        </div>
        <hr/>
        <div className="w-full mx-auto  shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-700 mx-10 mt-5">Reviews</h2>
          <ReviewList review={property?.reviews} property_id={{id}} />
        </div>
      </div>
    </div>
  );
};

export default Detail;

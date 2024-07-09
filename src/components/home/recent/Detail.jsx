import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesFailure,
  fetchPropertiesStart,
  fetchPropertiesSuccess,
} from "../../../redux/slice/propertiesSlice";
import Review from "./Review";
import {
  BASE_IMAGE_URL,
  BASE_URL,
  DEFAULT_IMAGE,
} from "../../../constants/const";
import ReviewList from "./ReviewList";
import ImageSlider from "../../common/ImageSlider";
import {
  FaBath,
  FaBed,
  FaCar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineHomeMini } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbChartArea } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GiDirectionSign } from "react-icons/gi";
import { Tabs, Tab, Avatar } from "@mui/material";
import Location from "./Location";
import DetailSkelaton from "../../common/DetailSkelaton";

const Detail = () => {
  const { id } = useParams();
  const { properties, error, loading } = useSelector((state) => state.properties);
  const {currentUser} = useSelector((state) => state.auth);
  console.log(properties)
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

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

  const property = properties.data?.property;
  const relatedProperties = properties.data?.related_properties;
  const reviews = properties.data?.reviews;
  const images = properties.data?.property?.property_images;
  console.log(images);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <DetailSkelaton />
    );
  }
  
  

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3 bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <ImageSlider images={images} />
        <div className="p-6 md:p-10">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              {property.property_type?.name}
            </h1>
            <div>
              <p>PRICE</p>
              <p className="text-green-600 font-bold mt-2 text-lg">
                ${property.price}
              </p>
            </div>
          </div>
          <div className="bg-orange-100 px-3 py-2 mt-3 w-[13rem] rounded-md font-bold text-orange-400">
            <p>{property.badge}</p>
          </div>
          <p className="text-gray-600 mt-4">{properties?.data?.description}</p>

          <Tabs
            value={activeTab}
            direction="left"
            onChange={(e, newValue) => setActiveTab(newValue)}
            className="mt-6"
          >
            <Tab label="General Info" />
            <Tab label="Related Properties" />
            <Tab label="Reviews" />
          </Tabs>

          {activeTab === 0 && (
            <div className="mt-6">
              {/* General Infos */}
              <div className="">
                <h3 className="my-8 font-bold text-lg">General Information</h3>
                <div className="flex flex-col lg:md:flex-row gap-8">
                  <div className="border-2 border-gray-100 rounded-lg p-5 flex flex-col gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar
                        alt="Remy Sharp"
                        out
                        src="https://i.pinimg.com/564x/20/8e/1f/208e1f4a8d572f1e41caa7ac49c10baa.jpg"
                      />
                      <p className="text-gray-600 mt-2 font-bold text-xl">
                        {property.agent?.name}
                      </p>
                      <p>AGENT</p>
                      <p>{property?.agent?.company_name}</p>
                    </div>
                    <div className="flex gap-3">
                      <CiMail className="text-lg font-bold" />
                      <p>{property.agent?.email}</p>
                    </div>
                    <div className="flex gap-3 bg-green-200 p-4 rounded-md font-bold">
                      <MdOutlineLocalPhone className="text-lg font-bold" />
                      <p className="text-gray-700">
                        {property.agent?.phone_number}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                      <p className="text-gray-600 mt-2">
                        <div className="border-2 border-gray-300 rounded-full p-2 mr-2 inline-flex">
                          <FaMapMarkerAlt className="text-md text-red-500" />
                        </div>
                        {property.property_location?.city?.name}, {property.property_location?.district?.name}, {property.property_location?.village?.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Area</h3>
                      <p className="text-gray-600 mt-2">
                        <div className="border-2 border-gray-300 rounded-full p-2 mr-2 inline-flex">
                          <TbChartArea className="text-md text-gray-700" />
                        </div>
                        {property.area || <p className="text-red-300">Not Available</p>}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">License Type</h3>
                      <p className="text-gray-600 mt-2">
                        <div className="border-2 border-gray-300 rounded-full p-2 mr-2 inline-flex">
                          <IoDocumentTextOutline className="text-md text-gray-700" />
                        </div>
                        {property.license || <span className="text-red-300">Not Available</span>}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Direction Facing</h3>
                      <p className="text-gray-600 mt-2">
                        <div className="border-2 border-gray-300 rounded-full p-2 mr-2 inline-flex">
                          <GiDirectionSign  className="text-md text-gray-700" />
                        </div>
                        {property.facing || <span className="text-red-300">Not Available</span>}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Land Type</h3>
                      <p className="text-gray-600 mt-2">{property.land_type || <span className="text-red-300">Not Available</span>}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Price</h3>
                      <p className="text-gray-600 mt-2">$ {property.price || <span className="text-red-300">Price Not Available</span>}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Sold Type</h3>
                      <p className="text-gray-600 mt-2">{property.sold_type || <span className="text-red-300">Not Available</span>}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="my-8 font-bold text-lg">Property Features</h3>
                <div className="flex flex-wrap justify-start items-start gap-4">
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <FaBath className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_bathrooms} Bath Rooms
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <FaBed className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_bedrooms} Bed Rooms
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <FaCar className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_car_spaces} Car Spaces
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <MdOutlineHomeMini className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_floors} Floors
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <FaBed className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_guestroom} Guest Rooms
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="border-2 border-green-100 rounded-full p-2">
                      <FaKitchenSet className="text-md text-green-300" />
                    </div>
                    <p className="font-semibold text-gray-600">
                      {property.features.number_of_kitchens} Kitchens
                    </p>
                  </li>
                </div>
              </div>

              {/* Google Map */}
              <div>
                <h3 className="my-8 font-bold text-lg">Property Location</h3>
                <Location latitude={property.property_location?.latitude} longitude={property.property_location?.longitude} />
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Related Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {relatedProperties?.map((relatedProperty) => (
                  <Link
                    to={`/property/${relatedProperty.id}`}
                    key={relatedProperty.id}
                  >
                    <div className="bg-white border-2 rounded-lg overflow-hidden">
                      <img
                        src={
                          relatedProperty.property_images.length > 0
                            ? `${BASE_IMAGE_URL}/storage/${relatedProperty.property_images[0].image}`
                            : DEFAULT_IMAGE
                        }
                        alt="Property"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {relatedProperty.property_type?.name}
                        </h3>
                        <p className="text-gray-600">
                          {relatedProperty.property_location?.city?.name},{" "}
                          {relatedProperty.property_location?.district?.name}
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
          )}


            {currentUser ?
            <div>
              {activeTab === 2 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-700">Reviews</h2>
                  <div className="w-full mx-auto overflow-hidden">
                    <Review property_id={{ id }} />
                  </div>
                  <hr />
                  <div className="w-full mx-auto shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-xl font-semibold text-gray-700 mx-10 mt-5">
                      Reviews
                    </h2>
                    <ReviewList review={reviews} property_id={{ id }} />
                  </div>
                </div>
              )}
            </div>
            : 
            <div>
              {activeTab === 2 && (<h3 className="text-center my-10 text-lg font-medium text-red-300">Please Sign In To Post A Review</h3> )}
            </div>
            }


        </div>
      </div>
    </div>
  );
};

export default Detail;
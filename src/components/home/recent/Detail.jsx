import axios from "axios";
import { useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure } from "../../../redux/slice/propertiesSlice";
import PropertyImageSlider from "./PropertyImageSlider";
import Review from "./Review";
import RelatedProperty from "./RelatedProperty";
import { FaPhoneSquareAlt } from "react-icons/fa";


const Detail = () => {
    const { id } = useParams();
    const { properties, error, loading } = useSelector((state) => state.properties);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPropertyDetail = async () => {
            try {
                dispatch(fetchPropertiesStart());
                const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`);
                if (response.status === 200) {
                    dispatch(fetchPropertiesSuccess(response.data));
                } else {
                    throw new Error('Failed to fetch property details');
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

    return (
        <div className="w-full flex flex-col gap-3 bg-gray-100 p-6 md:p-10">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <PropertyImageSlider/>
                <div className="p-6 md:p-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {properties.data?.title || "Beautiful Family House"}
                    </h1>
                    <div className="bg-orange-100 px-3 py-2 mt-3 w-[8rem] rounded-md font-bold text-orange-400">
                        <p >Badge</p>
                    </div>
                    <p className="text-gray-600 mt-4">{properties.data?.description}</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700"> Price</h2>
                            <p className="text-gray-600 mt-2">
                                $ 1900000
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700"> Location</h2>
                            <p className="text-gray-600 mt-2">
                                1234 Elm Street, Some City, Some Country
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700"> Area</h2>
                            <p className="text-gray-600 mt-2">
                                1234 Elm Street, Some City, Some Country
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">License Type</h2>
                            <p className="text-gray-600 mt-2">
                                SOFT
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Land Type</h2>
                            <p className="text-gray-600 mt-2">
                                NULL
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Contact Info</h2>
                            <p className="text-gray-600 mt-2">
                                NULL
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700"> Property</h2>
                            <ul className="text-gray-600 mt-2 grid grid-cols-2">
                                <li>Bedrooms : 2</li>  
                                <li>Floor : 2</li>  
                                <li>Bathroom : 3</li>
                                <li>Car Space: 2</li>
                                <li>Kitchen : 2</li>
                                <li>Guestroom : 1</li>
                                <li>Bedroom : 2</li>  
                            </ul>
                        </div>
                        {/* <div>
                            <h2 className="text-xl font-semibold text-gray-700">Reviews</h2>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                {properties.data?.reviews?.map((review) => (
                                    <li key={review.id}>{review.review}</li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                    <RelatedProperty properties={properties} />
                </div>
                <div className="w-full mx-auto  shadow-lg rounded-lg overflow-hidden">
                    <Review property_id={{id}}/>
                </div>
            </div>
        </div>
    );
}

export default Detail;

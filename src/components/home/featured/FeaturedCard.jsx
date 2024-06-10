import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchPropertyTypesSuccess, fetchPropertyTypesStart, fetchPropertyTypesFailure } from "../../../redux/slice/propertyTypesSlice"; // Ensure the correct path to your slice
import {featured} from "../../data/Data";

const FeaturedCard = () => {
    const dispatch = useDispatch();
    const { propertyTypes, error, loading } = useSelector((state) => state.propertyTypes);

    useEffect(() => {
        fetchPropertyTypes();
    }, []);

    useEffect(() => {
        console.log("Properties:", propertyTypes);
    }, [propertyTypes]);

    const fetchPropertyTypes = async () => {
        dispatch(fetchPropertyTypesStart());
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/property-types`);
            console.log("API Response:", response.data);
            dispatch(fetchPropertyTypesSuccess(response.data));
        } catch (error) {
            console.error("Fetch Property Types Error:", error);
            dispatch(fetchPropertyTypesFailure(error.response?.data?.message || "Failed to fetch property types"));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='flex overflow-x-auto space-x-4 p-4'>
            {propertyTypes.map((item, index) => (
                <div key={index}
                     className='min-w-[200px] border border-gray-300 p-4 shadow-sm bg-white flex-shrink-0 rounded-lg'>
                    <img src={featured[index].cover}/>
                    <h4 className='mb-2 text-lg font-semibold text-center'>{item.property_type}</h4>
                    <p className='mb-2 text-gray-600'>{item.property_type_description}</p>
                    <label className='font-bold text-gray-800'>{item.total}</label>
                </div>
            ))}
        </div>
    );
}

export default FeaturedCard;

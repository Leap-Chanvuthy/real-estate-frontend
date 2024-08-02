import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { BASE_URL } from "../../../constants/const";
import { Skeleton } from "@mui/material";
import { fetchCompaniesFailure, fetchCompaniesStart, fetchCompaniesSuccess } from "../../../redux/slice/companiesSlice";

const CompanyCard = () => {
    const dispatch = useDispatch();
    const { companies, error, loading } = useSelector((state) => state.companies);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        dispatch(fetchCompaniesStart());
        try {
            const response = await axios.get(`${BASE_URL}/KPI/top-ten-companies`);
            dispatch(fetchCompaniesSuccess(response.data));
        } catch (error) {
            console.error("Fetch Companies:", error);
            dispatch(fetchCompaniesFailure(error.response?.data?.message || "Failed to fetch companies"));
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='flex overflow-x-auto space-x-4 p-4'>
            {loading && <div className="rounded-sm flex gap-3">
                <Skeleton variant="rectangular" width={370} height={200}/>
                <Skeleton variant="rectangular" width={370} height={200}/>
                <Skeleton variant="rectangular" width={370} height={200}/>
                <Skeleton variant="rectangular" width={370} height={200}/>
            </div>}
            {companies.map((item, index) => (
                <div key={index}
                     className='min-w-[200px] border border-gray-300 p-4 shadow-sm bg-white flex-shrink-0 rounded-lg'>
                    <img width='100px' height='100px' src={item.company_logo} alt={item.company_name}/>
                    <p className='mb-2 text-gray-600 font-bold'>{item.company_name}</p>
                    <p className='mb-2 text-gray-600'>Email: {item.company_email}</p>
                    <p className='mb-2 text-gray-600'>Number: {item.company_phone_number}</p>
                    <p className='mb-2 text-gray-600'>Size: {item.company_size}</p>
                    <label className='font-bold text-gray-800'>No of property: {item.property_count}</label>
                </div>
            ))}
        </div>
    );
}

export default CompanyCard;

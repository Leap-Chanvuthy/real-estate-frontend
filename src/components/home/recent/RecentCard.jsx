// import React, { useEffect, useState } from "react"

// import Pagination from '@mui/material/Pagination';
// import axios from 'axios';
// import { fetchPropertiesStart , fetchPropertiesSuccess , fetchPropertiesFailure } from "../../../redux/slice/propertiesSlice";
// import { useSelector , useDispatch } from "react-redux";


// const RecentCard = () => {
//   // dispatch state
//   const dispatch = useDispatch();
//   const {properties , error , loading} = useSelector((state) => state.properties);
//   console.log(properties);


//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);

//   // Fetch properties list
//   const fetchProperties = async (page = currentPage) => {
//     dispatch(fetchPropertiesStart());
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/properties/?page=${page}`);
//       dispatch(fetchPropertiesSuccess(response.data));
//       setCurrentPage(response.data.meta.current_page);
//       setTotalPage(response.data.meta.last_page);
//     } catch (error) {
//       dispatch(fetchPropertiesFailure(error));
//     } 
//   };

//   // Pagination function (handlePageChange)
//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//     fetchProperties(newPage);
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);


//   return (
//     <div className="flex flex-col justify-center">
//         {loading && <h5 className="text-center">Loading....</h5>}
//       <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5'>
//         {properties.data && properties.data.map((val, index) => {
//           const { price , badge } = val
//           const image  = val.property_images.length > 0 ? val.property_images[0].image : "https://img.freepik.com/premium-vector/real-estate-business-concept-with-houses-real-estate-market-growth-flat-modern-design-illustration_566886-594.jpg";
//           return (
//             <div className='box shadow' key={index}>
//               <div className='img'>
//                 <img src={image} alt={image} className="h-[15rem] object-cover" />
//               </div>
//               <div className='text'>
//                 <div className='category flex'>
//                   <span style={{ background: badge === "For Sale" ? "#25b5791a" : "#ff98001a", color: badge === "For Sale" ? "#25b579" : "#ff9800" }}>{badge}</span>
//                   <i className='fa fa-heart'></i>
//                 </div>
//                 <h4>Property Name</h4>
//                 <p className="">
//                   <i className='fa fa-location-dot'></i> 
//                   <span>{val.property_location ? `${val.property_location.city.name}, ${val.property_location.country.name}` : <h6 className="text-red-400">Not available</h6>}</span>
//                 </p>
//               </div>
//               <div className='button flex'>
//                 <div>
//                   <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
//                 </div>
//                 <span>{val.property_type.name}</span>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//       <div className="mt-10" >
//         <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} shape="rounded" size="large" color="primary" showFirstButton showLastButton />
//       </div>
//     </div>
//   )
// }

// export default RecentCard



import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure } from "../../../redux/slice/propertiesSlice";
import { useSelector, useDispatch } from "react-redux";

const RecentCard = () => {
  const dispatch = useDispatch();
  const { properties, error, loading } = useSelector((state) => state.properties);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log("Properties:", properties);
  }, [properties]);

  const fetchProperties = async (page = currentPage) => {
    dispatch(fetchPropertiesStart());
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/properties/?page=${page}`);
      console.log("API Response:", response.data);
      dispatch(fetchPropertiesSuccess(response.data));
      setCurrentPage(response.data.meta.current_page);
      setTotalPage(response.data.meta.last_page);
    } catch (error) {
      console.error("Fetch Properties Error:", error);
      dispatch(fetchPropertiesFailure(error.response?.data?.message || "Failed to fetch properties"));
    } 
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchProperties(newPage);
  };

  return (
    <div className="flex flex-col justify-center">
      {loading && <h5 className="text-center">Loading....</h5>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5'>
        {properties.data && properties.data.map((val, index) => {
          const { price, badge } = val;
          const image = val.property_images.length > 0 ? val.property_images[0].image : "https://img.freepik.com/premium-vector/real-estate-business-concept-with-houses-real-estate-market-growth-flat-modern-design-illustration_566886-594.jpg";
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={image} alt={image} className="h-[15rem] object-cover" />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: badge === "For Sale" ? "#25b5791a" : "#ff98001a", color: badge === "For Sale" ? "#25b579" : "#ff9800" }}>{badge}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>Property Name</h4>
                <p className="">
                  <i className='fa fa-location-dot'></i> 
                  {/* <span>{val.property_location ? `${val.property_location.city.name}, ${val.property_location.country.name}` : <h6 className="text-red-400">Not available</h6>}</span> */}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{val.property_type.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} shape="rounded" size="large" color="primary" showFirstButton showLastButton />
      </div>
    </div>
  );
}

export default RecentCard;

import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  fetchPropertiesFailure,
  fetchPropertiesStart,
  fetchPropertiesSuccess,
} from "../../../redux/slice/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMAGE_URL, BASE_URL, DEFAULT_IMAGE } from "../../../constants/const";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const RecentCard = () => {
  const dispatch = useDispatch();
  const { properties, error, loading } = useSelector((state) => state.properties);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (page = currentPage) => {
    dispatch(fetchPropertiesStart());
    try {
      const response = await axios.get(`${BASE_URL}/properties/?page=${page}`);
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

  const SkeletonLoading = () => (
    <Grid container spacing={4}>
      {Array.from(new Array(6)).map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Box sx={{ width: '100%', margin: '0 auto' }}>
            <Skeleton variant="rectangular" width="100%" height={250} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="flex flex-col justify-center">
      {loading && <SkeletonLoading />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5">
        {Array.isArray(properties.data) &&
          properties.data.map((property, index) => {
            const { price, badge, property_location, property_images, property_type } = property;
            return (
              <div className="box shadow" key={index}>
                <Link to={`/property/${property.id}`}>
                  <div className="img">
                    {property_images.length > 0 ? (
                      <img
                        src={`${BASE_IMAGE_URL}/storage/${property_images[0].image}`}
                        alt="property"
                        className="h-[15rem] object-cover"
                      />
                    ) : (
                      <img src={DEFAULT_IMAGE} alt="property" className="h-[15rem] object-cover" />
                    )}
                  </div>
                  <div className="text">
                    <div className="category flex">
                      <span
                        style={{
                          background: badge === "FOR_SALE" ? "#25b5791a" : "#ff98001a",
                          color: badge === "FOR_SALE" ? "#25b579" : "#ff9800",
                        }}
                      >
                        {badge}
                      </span>
                      <i className="fa fa-heart"></i>
                    </div>
                    <h4>{property_type.name}</h4>
                    <p className="">
                      <i className="fa fa-location-dot"></i>
                      <span>{property_location?.city?.name}</span>
                    </p>
                  </div>
                  <div className="button flex">
                    <div>
                      <button className="btn2">$ {price}</button>
                    </div>
                    <span>{property_type.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="mt-10">
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default RecentCard;

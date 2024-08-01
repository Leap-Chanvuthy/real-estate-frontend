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
import Skeleton from "@mui/material/Skeleton";
import { TextField , FormControl , InputLabel , Select , MenuItem, Button } from "@mui/material";
import { fetchPropertyTypesStart , fetchPropertyTypesSuccess , fetchPropertyTypesFailure } from "../../../redux/slice/propertyTypesSlice";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineBathroom } from "react-icons/md";



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
      const response = await axios.get(`${BASE_URL}/properties`, {
        params: {
          page,
          'filter[propertyType.id]': values.property_type,
          'filter[min_price]': values.min_price,
          'filter[max_price]': values.max_price,
          'filter[number_of_bedrooms]': values.number_of_bedrooms,
          'filter[number_of_bathrooms]': values.number_of_bathrooms,
        },
      });
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

  
  // Search dataset 
  const [minPrice , setMinPrice] = useState([
    {
      id:1,
      price : 10000
    },
    {
      id:2,
      price : 20000
    },
    {
      id:3,
      price : 40000
    },
    {
      id:4,
      price : 40000
    },
    {
      id:5,
      price : 50000
    },
    {
      id:6,
      price : 60000
    },
    {
      id:7,
      price : 70000
    },
    {
      id:8,
      price : 80000
    },
    {
      id:9,
      price : 90000
    },
    {
      id:10,
      price : 100000
    },
  ]);
  const [maxPrice , setMaxPrice] = useState([
    {
      id:1,
      price : 200000
    },
    {
      id:2,
      price : 300000
    },
    {
      id:3,
      price : 400000
    },
    {
      id:4,
      price : 500000
    },
    {
      id:5,
      price : 600000
    },
    {
      id:6,
      price : 700000
    },
    {
      id:7,
      price : 800000
    },
    {
      id:8,
      price : 900000
    },
    {
      id:9,
      price : 1000000
    },
    {
      id:10,
      price : 1100000
    },
  ]);

  const [bedRoom , setBedRoom] = useState([
    {
      id : 1,
      bedroom : 1,
    },
    {
      id : 2,
      bedroom : 2,
    },
    {
      id : 3,
      bedroom : 3,
    },
    {
      id : 4,
      bedroom : 4,
    },
    {
      id : 5,
      bedroom : 5,
    },
    {
      id : 6,
      bedroom : 6,
    },
    {
      id : 7,
      bedroom : 7,
    },
  ]);

  const [bathRoom , setBathRoom] = useState([
    {
      id : 1,
      bathroom : 1,
    },
    {
      id : 2,
      bathroom : 2,
    },
    {
      id : 3,
      bathroom : 3,
    },
    {
      id : 4,
      bathroom : 4,
    },
    {
      id : 5,
      bathroom : 5,
    },
    {
      id : 6,
      bathroom : 6,
    },
    {
      id : 7,
      bathroom : 7,
    },
  ]);

  // filter and serch value

  const [values , setValues] = useState({
    property_type : "",
    min_price : "",
    max_price : "",
    number_of_bedrooms : "",
    number_of_bathrooms : ""
  })

  // clear filter 
  const clearFilter = () =>{
    setValues({
      property_type : "",
      min_price : "",
      max_price : "",
      number_of_bedrooms : "",
      number_of_bathrooms : ""
    })
  }

  const handleChangeSearchValue = (e) => {
    const key = e.target.name; // Use `name` instead of `id`
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };


  // Search and Filter
  const { propertyTypes} = useSelector((state) => state.propertyTypes);
  useEffect(() => {
      fetchPropertyTypes();
  }, []);

  const fetchPropertyTypes = async () => {
      dispatch(fetchPropertyTypesStart());
      try {
          const response = await axios.get(`${BASE_URL}/property-types`);
          dispatch(fetchPropertyTypesSuccess(response.data));
      } catch (error) {
          console.error("Fetch Property Types Error:", error);
          dispatch(fetchPropertyTypesFailure(error.response?.data?.message || "Failed to fetch property types"));
      }
  };

  console.log(properties);




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
    <div className="flex flex-col">
      {/* Serach and Filter */}
      <div className="my-10">
      <form className="flex flex-col gap-3" onSubmit={((e) => {e.preventDefault(); fetchProperties()})}>
      <div className="flex flex-col lg:flex-row gap-3">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="property-type-label">Property Type</InputLabel>
          <Select
            labelId="property-type-label"
            id="property_type"
            name="property_type" // Add name attribute
            value={values.property_type}
            onChange={handleChangeSearchValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {propertyTypes && propertyTypes.map((ppt) => (
              <MenuItem key={ppt.id} value={ppt.id}>{ppt.property_type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="min-price-label">Minimum Price</InputLabel>
          <Select
            labelId="min-price-label"
            id="min_price"
            name="min_price" // Add name attribute
            value={values.min_price}
            onChange={handleChangeSearchValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {minPrice && minPrice.map((min) => (
              <MenuItem key={min.id} value={min.price}>{min.price}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="max-price-label">Maximum Price</InputLabel>
          <Select
            labelId="max-price-label"
            id="max_price"
            name="max_price" // Add name attribute
            value={values.max_price}
            onChange={handleChangeSearchValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {maxPrice && maxPrice.map((max) => (
              <MenuItem key={max.id} value={max.price}>{max.price}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="bedrooms-label">Number of Bed Rooms</InputLabel>
          <Select
            labelId="bedrooms-label"
            id="number_of_bedrooms"
            name="number_of_bedrooms" // Add name attribute
            value={values.number_of_bedrooms}
            onChange={handleChangeSearchValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {bedRoom && bedRoom.map((bed) => (
              <MenuItem key={bed.id} value={bed.bedroom}>{bed.bedroom}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="bathrooms-label">Number of Bath Rooms</InputLabel>
          <Select
            labelId="bathrooms-label"
            id="number_of_bathrooms"
            name="number_of_bathrooms" // Add name attribute
            value={values.number_of_bathrooms}
            onChange={handleChangeSearchValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {bathRoom && bathRoom.map((bathroom) => (
              <MenuItem key={bathroom.id} value={bathroom.bathroom}>{bathroom.bathroom}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <Button variant="outlined" type="submit">Search</Button>
        <Button variant="outlined" color="error" onClick={clearFilter}>Clear Filter</Button>
      </div>
    </form>
      </div>
      {loading && <SkeletonLoading />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5">
        {Array.isArray(properties.data) &&
          properties.data.map((property, index) => {
            const { price, badge, property_location, property_images, property_type , features } = property;
            { if (properties.data.length == 0) return (<p>No such properties found.</p>) }
            return (
              <div className="box shadow" key={index}>
                <Link to={`/property/${property.id}`}>
                  <div className="img">
                    {property_images.length > 0 ? (
                      <img
                        src={`${BASE_IMAGE_URL}/${property_images[0].image}`}
                        alt="property"
                        className="h-[15rem] object-cover"
                      />
                    ) : (
                      <img src={DEFAULT_IMAGE} alt="property" className="h-[15rem] object-cover" />
                    )}
                  </div>
                  <div className="text">
                    <h4 className="font-bold my-3 text-lg">{property_type.name}</h4>
                    <div className="category flexs">
                      <span
                        style={{
                          background: badge === "FOR_SALE" ? "#25b5791a" : "#ff98001a",
                          color: badge === "FOR_SALE" ? "#25b579" : "#ff9800",
                        }}
                      >
                        {badge}
                      </span>
                      {/* <i className="fa fa-heart my-3"></i> */}
                    </div>
                    <div className="flex flex-col lg:md:flex-row justify-between ">
                      <p className="flex items-center gap-3 my-2">
                        <i className="fa fa-location-dot text-red-500 "></i>
                        <span>{property_location?.city?.name}</span>
                      </p>
                      <span className="bg-[#2483c7] text-white rounded-md p-2">$ {price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:md:flex-row gap-3 mx-5 my-3">
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                          <IoBedOutline className="text-gray-600" />
                        </div>
                        <p>{features.number_of_bedrooms}</p>
                      </div>
                      <p>Bedrooms</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                          <MdOutlineBathroom className="text-gray-600" />
                        </div>
                        <p>{features.number_of_bathrooms}</p>
                      </div>
                      <p>Bathrooms</p>
                    </div>
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

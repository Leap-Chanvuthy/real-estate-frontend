import React, {useEffect, useState} from "react";
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";
import axios from "axios";
import {
    fetchPropertiesFailure,
    fetchPropertiesStart,
    fetchPropertiesSuccess,
} from "../../../redux/slice/propertiesSlice";
import {useDispatch, useSelector} from "react-redux";
import {BASE_IMAGE_URL, BASE_URL, DEFAULT_IMAGE} from "../../../constants/const";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {TextField, FormControl, InputLabel, Select, MenuItem, Button} from "@mui/material";
import {
    fetchPropertyTypesStart,
    fetchPropertyTypesSuccess,
    fetchPropertyTypesFailure
} from "../../../redux/slice/propertyTypesSlice";
import {IoBedOutline} from "react-icons/io5";
import {MdOutlineBathroom} from "react-icons/md";


const RecentCard = () => {
    const dispatch = useDispatch();
    const {properties, error, loading} = useSelector((state) => state.properties);

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
                    'filter[city_name]': values.city_name,
                    'filter[propertyType.id]': values.property_type,
                    'filter[min_price]': values.min_price,
                    'filter[max_price]': values.max_price,
                    'filter[number_of_bedrooms]': values.number_of_bedrooms,
                    'filter[number_of_bathrooms]': values.number_of_bathrooms,
                    'filter[sold_type]': values.sold_type,
                    'filter[badge]': values.badge,
                    'filter[license]': values.license,
                    'sort': values.sort,
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

    const [cities, setCities] = useState([
        {name: 'Phnom Penh'},
        {name: 'Siem Reap'},
        {name: 'Battambang'},
        {name: 'Sihanoukville'},
        {name: 'Kampong Cham'},
        {name: 'Kampot'},
        {name: 'Kep'},
        {name: 'Poipet'},
        {name: 'Ta Khmau'},
        {name: 'Pursat'},
        {name: 'Kampong Thom'},
        {name: 'Svay Rieng'},
        {name: 'Prey Veng'},
        {name: 'Stung Treng'},
        {name: 'Kratie'},
        {name: 'Pailin'},
        {name: 'Senmonorom'},
        {name: 'Banlung'},
        {name: 'Samraong'},
        {name: 'Suong'},
        {name: 'Takeo'},
        {name: 'Kampong Speu'},
        {name: 'Koh Kong'},
        {name: 'Preah Vihear'},
        {name: 'Banteay Meanchey'},
        {name: 'Kandal'},
        {name: 'Preah Sihanouk'},
        {name: 'Mondulkiri'},
        {name: 'Ratanakiri'},
        {name: 'Oddar Meanchey'},
        {name: 'Tboung Khmum'}
    ]);


    // Search dataset
    const [minPrice, setMinPrice] = useState([
        {
            id: 1,
            price: 10000
        },
        {
            id: 2,
            price: 20000
        },
        {
            id: 3,
            price: 40000
        },
        {
            id: 4,
            price: 40000
        },
        {
            id: 5,
            price: 50000
        },
        {
            id: 6,
            price: 60000
        },
        {
            id: 7,
            price: 70000
        },
        {
            id: 8,
            price: 80000
        },
        {
            id: 9,
            price: 90000
        },
        {
            id: 10,
            price: 100000
        },
    ]);
    const [maxPrice, setMaxPrice] = useState([
        {
            id: 1,
            price: 200000
        },
        {
            id: 2,
            price: 300000
        },
        {
            id: 3,
            price: 400000
        },
        {
            id: 4,
            price: 500000
        },
        {
            id: 5,
            price: 600000
        },
        {
            id: 6,
            price: 700000
        },
        {
            id: 7,
            price: 800000
        },
        {
            id: 8,
            price: 900000
        },
        {
            id: 9,
            price: 1000000
        },
        {
            id: 10,
            price: 1100000
        },
    ]);

    const [bedRoom, setBedRoom] = useState([
        {
            id: 1,
            bedroom: 1,
        },
        {
            id: 2,
            bedroom: 2,
        },
        {
            id: 3,
            bedroom: 3,
        },
        {
            id: 4,
            bedroom: 4,
        },
        {
            id: 5,
            bedroom: 5,
        },
        {
            id: 6,
            bedroom: 6,
        },
        {
            id: 7,
            bedroom: 7,
        },
    ]);

    const [bathRoom, setBathRoom] = useState([
        {
            id: 1,
            bathroom: 1,
        },
        {
            id: 2,
            bathroom: 2,
        },
        {
            id: 3,
            bathroom: 3,
        },
        {
            id: 4,
            bathroom: 4,
        },
        {
            id: 5,
            bathroom: 5,
        },
        {
            id: 6,
            bathroom: 6,
        },
        {
            id: 7,
            bathroom: 7,
        },
    ]);

    const [soldType, setSoldType] = useState([
        {
            name: 'For Sale',
            soldType: 'FOR_SALE',
        },
        {
            name: 'For Rent',
            soldType: 'FOR_RENT',
        },
    ]);

    const [badges, setBadges] = useState([
        {
            name: 'Urgent',
            badge: 'URGENT',
        },
        {
            name: 'Negotiate',
            badge: 'NEGOTIATE',
        },
        {
            name: 'Lower Market Price',
            badge: 'LOWER_MARKET_PRICE',
        },
    ]);

    const [license, setLicense] = useState([
        {
            name: 'Hard',
            license: 'HARD',
        },
        {
            name: 'Soft',
            license: 'SOFT',
        },
    ]);

    const [sort, setSort] = useState([
        { name: 'Old', sort: 'created_at' },
        { name: 'New', sort: '-created_at' },
        { name: 'Price (Lower to higher)', sort: 'price' },
        { name: 'Price (Higher to lower)', sort: '-price' },
        { name: 'Area (Lower to higher)', sort: 'area' },
        { name: 'Area (Higher to lower)', sort: '-area' },
        { name: 'Number of Bedrooms (Lower to higher)', sort: 'number_of_bedrooms' },
        { name: 'Number of Bedrooms (Higher to lower)', sort: '-number_of_bedrooms' },
        { name: 'Number of Bathrooms (Lower to higher)', sort: 'number_of_bathrooms' },
        { name: 'Number of Bathrooms (Higher to lower)', sort: '-number_of_bathrooms' },
        { name: 'Number of Kitchens (Lower to higher)', sort: 'number_of_kitchens' },
        { name: 'Number of Kitchens (Higher to lower)', sort: '-number_of_kitchens' },
        { name: 'Number of Car Spaces (Lower to higher)', sort: 'number_of_car_spaces' },
        { name: 'Number of Car Spaces (Higher to lower)', sort: '-number_of_car_spaces' },
        { name: 'Number of Floor (Lower to higher)', sort: 'number_of_floor' },
        { name: 'Number of Floor (Higher to lower)', sort: '-number_of_floor' },
        { name: 'Number of Guestroom (Lower to higher)', sort: 'number_of_guestroom' },
        { name: 'Number of Guestroom (Higher to lower)', sort: '-number_of_guestroom' }
    ]);
    // filter and serch value

    const [values, setValues] = useState({
        city_name: "",
        property_type: "",
        min_price: "",
        max_price: "",
        number_of_bedrooms: "",
        number_of_bathrooms: "",
        sold_type: "",
        badge: '',
        license: '',
        sort: '',
    })

    // clear filter
    const clearFilter = () => {
        setValues({
            city_name: "",
            property_type: "",
            min_price: "",
            max_price: "",
            number_of_bedrooms: "",
            number_of_bathrooms: "",
            sold_type: "",
            badge: '',
            license: '',
            sort: '',
        })
    }

    const handleChangeSearchValue = (e) => {
        const key = e.target.name; // Use `name` instead of `id`
        const value = e.target.value;
        setValues({...values, [key]: value});
    };


    // Search and Filter
    const {propertyTypes} = useSelector((state) => state.propertyTypes);
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
                    <Box sx={{width: '100%', margin: '0 auto'}}>
                        <Skeleton variant="rectangular" width="100%" height={250}/>
                        <Box sx={{pt: 0.5}}>
                            <Skeleton/>
                            <Skeleton width="60%"/>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <div className="flex flex-col px-4 py-6">
            {/* Search and Filter */}
            <div className="my-10">
                <form className="flex flex-col gap-6" onSubmit={(e) => {
                    e.preventDefault();
                    fetchProperties();
                }}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="sort-label">Sort: Relevance</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort"
                                name="sort"
                                value={values.sort}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {sort && sort.map((sort) => (
                                    <MenuItem key={sort.sort} value={sort.sort}>{sort.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="sold-type-label">Sale/Rent</InputLabel>
                            <Select
                                labelId="sold-type-label"
                                id="sold_type"
                                name="sold_type"
                                value={values.sold_type}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {soldType && soldType.map((st) => (
                                    <MenuItem key={st.soldType} value={st.soldType}>{st.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="city-name-label">Cities/Provinces</InputLabel>
                            <Select
                                labelId="city-name-label"
                                id="city_name"
                                name="city_name"
                                value={values.city_name}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {cities && cities.map((city) => (
                                    <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="property-type-label">Property Type</InputLabel>
                            <Select
                                labelId="property-type-label"
                                id="property_type"
                                name="property_type"
                                value={values.property_type}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {propertyTypes && propertyTypes.map((ppt) => (
                                    <MenuItem key={ppt.id} value={ppt.id}>{ppt.property_type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="badge-label">Badge</InputLabel>
                            <Select
                                labelId="badge-label"
                                id="badge"
                                name="badge"
                                value={values.badge}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {badges && badges.map((badge) => (
                                    <MenuItem key={badge.badge} value={badge.badge}>{badge.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="license-label">License</InputLabel>
                            <Select
                                labelId="license-label"
                                id="license"
                                name="license"
                                value={values.license}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {license && license.map((license) => (
                                    <MenuItem key={license.license} value={license.license}>{license.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="min-price-label">Minimum Price</InputLabel>
                            <Select
                                labelId="min-price-label"
                                id="min_price"
                                name="min_price"
                                value={values.min_price}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {minPrice && minPrice.map((min) => (
                                    <MenuItem key={min.id} value={min.price}>{min.price}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="max-price-label">Maximum Price</InputLabel>
                            <Select
                                labelId="max-price-label"
                                id="max_price"
                                name="max_price"
                                value={values.max_price}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {maxPrice && maxPrice.map((max) => (
                                    <MenuItem key={max.id} value={max.price}>{max.price}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="bedrooms-label">Number of Bed Rooms</InputLabel>
                            <Select
                                labelId="bedrooms-label"
                                id="number_of_bedrooms"
                                name="number_of_bedrooms"
                                value={values.number_of_bedrooms}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {bedRoom && bedRoom.map((bed) => (
                                    <MenuItem key={bed.id} value={bed.bedroom}>{bed.bedroom}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="bathrooms-label">Number of Bath Rooms</InputLabel>
                            <Select
                                labelId="bathrooms-label"
                                id="number_of_bathrooms"
                                name="number_of_bathrooms"
                                value={values.number_of_bathrooms}
                                onChange={handleChangeSearchValue}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {bathRoom && bathRoom.map((bathroom) => (
                                    <MenuItem key={bathroom.id} value={bathroom.bathroom}>{bathroom.bathroom}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex justify-between gap-3 mt-4">
                        <Button variant="outlined" type="submit" color="primary">Search</Button>
                        <Button variant="outlined" color="error" onClick={clearFilter}>Clear Filter</Button>
                    </div>
                </form>
            </div>

            {loading && <Skeleton variant="rectangular" width="100%" height={400}/>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-5">
                {Array.isArray(properties.data) && properties.data.length > 0 ? (
                    properties.data.map((property, index) => {
                        const {price, badge, property_location, property_images, property_type, features} = property;
                        return (
                            <div className="shadow-lg rounded-lg overflow-hidden" key={index}>
                                <Link to={`/property/${property.id}`}>
                                    <div className="relative">
                                        {property_images.length > 0 ? (
                                            <img
                                                src={`${BASE_IMAGE_URL}/${property_images[0].image}`}
                                                alt="property"
                                                className="w-full h-[15rem] object-cover"
                                            />
                                        ) : (
                                            <img src={DEFAULT_IMAGE} alt="property"
                                                 className="w-full h-[15rem] object-cover"/>
                                        )}
                                        <div className="absolute top-0 right-0 bg-white p-2 text-xs rounded-bl-lg">
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${badge === "FOR_SALE" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                      {badge}
                    </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-xl mb-2">{property_type.name}</h4>
                                        <div className="flex items-center gap-2 mb-2 text-sm">
                                            <i className="fa fa-location-dot text-red-500"></i>
                                            <span>{property_location?.city?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span
                                                className="bg-blue-600 text-white rounded-md p-2 text-lg">${price}</span>
                                        </div>
                                        <div className="flex gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <IoBedOutline className="text-gray-600"/>
                                                <span>{features.number_of_bedrooms} Bedrooms</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MdOutlineBathroom className="text-gray-600"/>
                                                <span>{features.number_of_bathrooms} Bathrooms</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center col-span-full mt-4">No such properties found.</p>
                )}
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

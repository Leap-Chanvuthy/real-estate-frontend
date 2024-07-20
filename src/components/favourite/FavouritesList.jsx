// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFavourite, addFavourite } from '../../redux/slice/favouritesSlice';
// import { Link } from 'react-router-dom';
// import { DEFAULT_IMAGE } from '../../constants/const';
// import { FaLocationDot } from "react-icons/fa6";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

// const FavoritesList = () => {
//   const { items } = useSelector((state) => state.favourites);
//   const dispatch = useDispatch();

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [currentProperty, setCurrentProperty] = useState(null);

//   const handleFavouriteClick = (property) => {
//     setCurrentProperty(property);
//     setDialogOpen(true);
//   };

//   const confirmRemoveFavourite = () => {
//     dispatch(removeFavourite(currentProperty));
//     setSnackbarOpen(true);
//     setDialogOpen(false);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <div className='m-10'>
//       <h1 className='font-bold text-xl my-5'>Favourite Properties</h1>  
//       {items.length === 0 ? (
//         <p>No favorite properties yet.</p>
//       ) : (
//         items.map((property) => {
//           const isFavourite = items.some((item) => item.id === property.id);

//           return (
//             <div key={property.id} className='border-2 p-5 rounded-md mb-5'>
//               <div className='flex flex-col lg:flex-row gap-10'>
//                 <Link to={`/property/${property.id}`}>
//                     <img
//                       src={DEFAULT_IMAGE}
//                       className='w-80 rounded-md'
//                       alt={property.property_type?.name}
//                     />
//                 </Link>
//                 <div className='flex flex-col gap-2'>
//                   <div className='flex justify-between items-center'>
//                     <h3 className='font-bold text-lg'>{property.property_type?.name || 'Property'}</h3>
//                     {isFavourite ? (
//                       <AiFillHeart
//                         className="text-2xl text-red-500 cursor-pointer"
//                         onClick={() => handleFavouriteClick(property)}
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         className="text-2xl text-orange-400 cursor-pointer"
//                         onClick={() => handleFavouriteClick(property)}
//                       />
//                     )}
//                   </div>
//                   <div className='flex flex-col lg:md:flex-row gap-3'>
//                     <div className="bg-orange-100 px-3 py-2 w-[13rem] rounded-md font-bold text-orange-400">
//                       <p>{property.badge}</p>
//                     </div>
//                     <p className='font-bold text-green-500'>${property.price}</p>
//                   </div>
//                   <p className='text-gray-600 text-justify'>
//                     {property.property_location?.city?.name}, {property.property_location?.district?.name}, {property.property_location?.village?.name}
//                   </p>
//                   <div className='flex gap-2 items-center'>
//                     <FaLocationDot className='text-red-500' />
//                     <p className='font-medium'>{property.property_location?.city?.name}, {property.property_location?.district?.name}</p>
//                   </div>
//                   <div className='flex flex-col lg:md:flex-row gap-3'>
//                       <p className='text-gray-600'>Area: {property.area} sq.m</p>
//                       <p className='text-gray-600'>Facing: {property.facing || 'Not Available'}</p>
//                       <p className='text-gray-600'>Sold Type: {property.sold_type || 'Not Available'}</p>
//                       <p className='text-gray-600'>License: {property.license || 'Not Available'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           Property removed from favorites
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Removal</DialogTitle>
//         <DialogContent>
//           Are you sure you want to remove this property from your favorites?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button onClick={confirmRemoveFavourite} color="primary">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default FavoritesList;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavourite, addFavourite } from '../../redux/slice/favouritesSlice';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE } from '../../constants/const';
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const FavoritesList = () => {
  const { items } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFavouriteClick = (property) => {
    setCurrentProperty(property);
    setDialogOpen(true);
  };

  const confirmRemoveFavourite = () => {
    dispatch(removeFavourite(currentProperty));
    setSnackbarOpen(true);
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((property) =>
    property.property_type?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='m-10'>
      <div className='flex justify-between items-center gap-4 mb-5'>
        <h1 className='font-bold text-xl'>Favourite Properties</h1>
        <div className=''>
            <TextField
              label="Search your favourite "
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              className='flex-grow '
            />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className='text-center'>No favorite properties found.</p>
      ) : (
        filteredItems.map((property) => {
          const isFavourite = items.some((item) => item.id === property.id);

          return (
            <div key={property.id} className='border-2 p-5 rounded-md mb-5'>
              <div className='flex flex-col lg:flex-row gap-10'>
                <Link to={`/property/${property.id}`}>
                    <img
                      src={DEFAULT_IMAGE}
                      className='w-80 rounded-md'
                      alt={property.property_type?.name}
                    />
                </Link>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-lg'>{property.property_type?.name || 'Property'}</h3>
                    {isFavourite ? (
                      <AiFillHeart
                        className="text-2xl text-red-500 cursor-pointer"
                        onClick={() => handleFavouriteClick(property)}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="text-2xl text-orange-400 cursor-pointer"
                        onClick={() => handleFavouriteClick(property)}
                      />
                    )}
                  </div>
                  <div className='flex flex-col lg:md:flex-row gap-3'>
                    <div className="bg-orange-100 px-3 py-2 w-[13rem] rounded-md font-bold text-orange-400">
                      <p>{property.badge}</p>
                    </div>
                    <p className='font-bold text-green-500'>${property.price}</p>
                  </div>
                  <p className='text-gray-600 text-justify'>
                    {property.property_location?.city?.name}, {property.property_location?.district?.name}, {property.property_location?.village?.name}
                  </p>
                  <div className='flex gap-2 items-center'>
                    <FaLocationDot className='text-red-500' />
                    <p className='font-medium'>{property.property_location?.city?.name}, {property.property_location?.district?.name}</p>
                  </div>
                  <div className='flex flex-col lg:md:flex-row gap-3'>
                      <p className='text-gray-600'>Area: {property.area} sq.m</p>
                      <p className='text-gray-600'>Facing: {property.facing || 'Not Available'}</p>
                      <p className='text-gray-600'>Sold Type: {property.sold_type || 'Not Available'}</p>
                      <p className='text-gray-600'>License: {property.license || 'Not Available'}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Property removed from favorites
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this property from your favorites?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmRemoveFavourite} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FavoritesList;

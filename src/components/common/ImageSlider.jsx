// import * as React from 'react';
// import Slider from 'react-slick';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import { BASE_IMAGE_URL } from '../../constants/const';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function ImageSlider({ images }) {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = images.length;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     beforeChange: (current, next) => setActiveStep(next),
//     arrows: false
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <Box sx={{ maxWidth: '', flexGrow: 1 }}>
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component="img"
//                 sx={{
//                   display: 'block',
//                   maxWidth: '100%',
//                   height: '30rem',
//                   width: '100%',
//                   objectFit: 'cover',
//                 }}
//                 src={`${BASE_IMAGE_URL}/${image.image}`}
//               />
//             ) : null}
//           </div>
//         ))}
//       </Slider>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
//         <Button
//           size="small"
//           onClick={handleBack}
//           disabled={activeStep === 0}
//         >
//           Back
//         </Button>
//         <Button
//           size="small"
//           onClick={handleNext}
//           disabled={activeStep === maxSteps - 1}
//         >
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default ImageSlider;


import React, { useState } from 'react';
import './slider.css'; // Import custom styles for animations
import { BASE_IMAGE_URL } from '../../constants/const';

const ImageSlider = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  return (
    <div className="relative max-w-full w-full overflow-hidden">
      <div className="relative w-full h-96 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === activeStep ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
          >
            <img
              src={`${BASE_IMAGE_URL}/${image.image}`}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleBack}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        &#9654;
      </button>
    </div>
  );
};

export default ImageSlider;

import { Tabs, Tab, Avatar, Skeleton } from "@mui/material";
import { useState } from "react";

const DetailSkelaton = () => {
    const [activeTab, setActiveTab] = useState(0);
    return ( 
        <div className="w-full flex flex-col gap-3  p-6 md:p-10">
        <div >
          {/* Image Slider Skeleton */}
          <Skeleton variant="rectangular" width="100%" height={400} />
  
          <div className="p-6 md:p-10">
            {/* Title and Price Skeleton */}
            <div className="flex justify-between">
              <Skeleton variant="text" width="70%" height={40} />
              <div>
                <Skeleton variant="text" width="30%" height={20} />
                <Skeleton variant="text" width="50%" height={30} className="mt-2" />
              </div>
            </div>
  
            {/* Badge Skeleton */}
            <div className="px-3 py-2 mt-3 w-[13rem] rounded-md font-bold ">
              <Skeleton variant="text" width="100%" height={20} />
            </div>
  
            {/* Description Skeleton */}
            <Skeleton variant="text" height={100} className="mt-4" />
  
            {/* Tabs Skeleton */}
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
  
            {/* General Info Skeleton */}
            <div className="mt-6">
              <h3 className="my-8 font-bold text-lg">General Information</h3>
              <div className="flex flex-col lg:md:flex-row gap-8">
                {/* Agent Card Skeleton */}
                <div className="border-2 border-gray-100 rounded-lg p-5 flex flex-col gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton variant="circular" width={80} height={80} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </div>
                  <div className="flex gap-3">
                    <Skeleton variant="text" width="50%" />
                  </div>
                  <div className="flex gap-3 bg-green-200 p-4 rounded-md font-bold">
                    <Skeleton variant="text" width="50%" />
                  </div>
                </div>
  
                {/* Property Details Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Area</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">License Type</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Land Type</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Price</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Sold Type</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Direction Facing</h3>
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Property Features Skeleton */}
            <div>
              <h3 className="my-8 font-bold text-lg">Property Features</h3>
              <div className="flex flex-wrap justify-start items-start gap-4">
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="my-8 font-bold text-lg">Property Location</h3>
                <Skeleton variant="rectangular" width="100%" height={250} />
            </div>

            {/* Review */}
            <div>
              <h3 className="my-8 font-bold text-lg">Comment Property</h3>
                <div className="flex flex-col gap-3">
                  <Skeleton variant="rectangular" width="100%" height={70} />
                  <Skeleton variant="rectangular" width="100%" height={30} />
                </div>
                <div className="mt-5">
                  <Skeleton variant="rectangular" width={100} height={30} />
                </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default DetailSkelaton;
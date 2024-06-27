import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { TextField } from "@mui/material";
import { useSelector , useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../constants/const";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ReviewList = ({ review  }) => {
  console.log("review :", review);

  const {currentUser} = useSelector((state) => state.auth);
  const username = currentUser.user.name;
  const token = currentUser.authorisation.token;
  const {id} = useParams();

  
//   const handleDelete = async (review_id) => {

//     try {
//       const response = await axios.delete(`${BASE_URL}/properties/${id}/reviews/${review_id}` , {
//         headers : {Authorization : `Bearer ${token}`}
//       });
//       console.log(response);
//       console.log(`${BASE_URL}/properties/${id}/reviews/${review_id}`)
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };
  



  return (
    <div>
      {review &&
        review.map((rev) => (
          <div className="mx-10 my-5 border-2 p-2 rounded-md">
            <div>
              <div className="flex justify-between my-2">
                <h5 className="font-semibold text-gray-600">{rev.reviewer}</h5>
                {rev.reviewer == username ? 
                <div className="flex justify-between gap-3 text-lg">
                  <RiDeleteBin5Line className="text-red-500 font-bold" />
                  <FaRegEdit className=" font-bold" />
                </div> : <></>
                }
              </div>
              <p className="text-justify font-light">{rev.review}</p>
              <div className="mt-3">
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    className="w-full"
                  />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;

import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import {CircularProgress , Button} from '@mui/material';
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { updateUserProfile } from "../../redux/slice/authSlice";
import axios from "axios";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user = currentUser?.user;
  const authorisation = currentUser?.authorisation;

  // const handleLogout = () => {
  //     dispatch(logout());
  //     persistor.purge(); // Clear persisted storage
  //     window.location.href = '/'; // Redirect to login page
  //   };

  // Current User Credential
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const [errorArray, setErrorArray] = useState([]);
  const [success , setSuccess] = useState(false);
  const [loading , setLoading] = useState(false);

  console.log(errorArray);
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/profile/update",
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      console.log(response);
      if (response.status == 200) {
        // dispatch(updateUserProfile({...user , ...response.data}));
        dispatch(
          updateUserProfile({
            authorisation: authorisation,
            user: response.data.data,
          })
        );
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false)
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorArray(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <div className="mx-10">
      
      <UpdateProfile/>
      <hr />

      <UpdatePassword/>

      <hr />

      <div className="flex flex-col lg:md:flex-row justify-between items-start gap-10 my-10">
        <div className="w-full">
          <h3 className="text-xl font-bold">Two Factors Authetentication</h3>
          <p>
            Add Extra Layer With Two Factors Authetentication. Use Google
            Authenticators Secure Your Account.
          </p>
          <button className="bg-slate-800 px-4 py-2  mt-5 rounded-sm text-white">
            Enable
          </button>
        </div>
        <div className="w-full ">
          <div className="flex">
            <img
              className="w-[160px]"
              src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
            />
            {/* <div className="mt-5">
                <strong>Steps :</strong>
                <ul>
                  <li>Click Enable</li>
                  <li>Scan QR Code In Google Authenticator</li>
                  <li>Enter Your OTP Code</li>
                  <li className="font-bold text-green-500">Done ✔</li>
                </ul>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

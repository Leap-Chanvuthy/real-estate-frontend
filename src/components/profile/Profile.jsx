import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { CircularProgress, Button } from "@mui/material";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { updateUserProfile } from "../../redux/slice/authSlice";
import axios from "axios";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import Enable2FA from "./components/Enable2FA";

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
          setSuccess(false);
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
      <UpdateProfile />
      <hr />
      <UpdatePassword />
      <hr />
      <Enable2FA/>
    </div>
  );
};

export default Profile;

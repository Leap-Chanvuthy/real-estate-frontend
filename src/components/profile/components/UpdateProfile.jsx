import { useSelector, useDispatch } from "react-redux";
import { Snackbar, CircularProgress, Button } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { updateUserProfile } from "../../../redux/slice/authSlice";
import axios from "axios";
import { BASE_URL } from "../../../constants/const";

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user = currentUser?.user;
  const authorisation = currentUser?.authorisation;

  // Current User Credential
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  // Update Profile
  const [errorArray, setErrorArray] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
        `${BASE_URL}/profile/update`,
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(
          updateUserProfile({
            authorisation: authorisation,
            user: response.data.data,
          })
        );
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorArray(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };

  return (
    <div className="flex flex-col lg:md:flex-row justify-between items-start gap-10 my-10">
      <div className="w-full">
        <h3 className="text-xl font-bold">Profile Information</h3>
        <p>Update Your Profile Infos</p>
      </div>
      <form className="w-full" onSubmit={handleUpdateProfile}>
        <TextField
          id="name"
          label="Username"
          size="medium"
          className="w-full"
          variant="outlined"
          error={Boolean(errorArray?.name)}
          helperText={errorArray?.name ? errorArray.name.join(", ") : ""}
          value={values.name}
          onChange={handleChange}
        />
        <div className="flex gap-5 mt-5 mb-3">
          <TextField
            id="email"
            label="Email"
            size="medium"
            className="w-full"
            variant="outlined"
            error={Boolean(errorArray?.email)}
            helperText={errorArray?.email ? errorArray.email.join(", ") : ""}
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            id="phone_number"
            label="Phone Number"
            size="medium"
            className="w-full"
            variant="outlined"
            error={Boolean(errorArray?.phone_number)}
            helperText={errorArray?.phone_number ? errorArray.phone_number.join(", ") : ""}
            value={values.phone_number}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="outlined"
          size="medium"
          type="submit"
        >
          {loading ? <CircularProgress size={25} /> : 'Update'}
        </Button>
      </form>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleCloseSnackbar}
        >
          Profile Updated Successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default UpdateProfile;

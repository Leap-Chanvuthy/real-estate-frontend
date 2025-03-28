import TextField from "@mui/material/TextField";
import { CircularProgress, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../redux/slice/authSlice";
import { BASE_URL } from "../../../constants/const";

const UpdatePassword = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const authorisation = currentUser?.authorisation;

  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    password_confirmation: "",
  });

  const [errorArray, setErrorArray] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleChagePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/change-password`,
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setValues({
          current_password: "",
          new_password: "",
          password_confirmation: "",
        });
      }
    } catch (error) {
      setErrorArray(error.response.data.errors);
      console.log(error);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  return (
    <div className="flex flex-col lg:md:flex-row justify-between items-start gap-10 my-10">
      <div className="w-full">
        <h3 className="text-xl font-bold">Password</h3>
        <p>Password Must Be At Least 8 Characters Long</p>
      </div>
      <form className="w-full" onSubmit={handleChagePassword}>
        <TextField
          id="current_password"
          label="Current Password"
          size="medium"
          error={Boolean(errorArray?.current_password)}
          helperText={
            errorArray?.current_password
              ? errorArray.curr?.current_password.join(", ")
              : ""
          }
          className="w-full"
          variant="outlined"
          value={values.current_password}
          onChange={handleChange}
        />
        <div className="flex gap-5 mt-5 mb-3">
          <TextField
            id="new_password"
            label="New Password"
            size="medium"
            error={Boolean(errorArray?.new_password)}
            helperText={
              errorArray?.new_password ? errorArray.new_password.join(", ") : ""
            }
            className="w-full"
            variant="outlined"
            value={values.new_password}
            onChange={handleChange}
          />
          <TextField
            id="password_confirmation"
            label="Confirm New Password"
            size="medium"
            error={Boolean(errorArray?.password_confirmation)}
            helperText={
              errorArray?.password_confirmation
                ? errorArray.password_confirmation.join(", ")
                : ""
            }
            className="w-full"
            variant="outlined"
            value={values.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <Button variant="outlined" size="medium" type="submit">
          {loading ? <CircularProgress size={25} /> : "Update"}
        </Button>

        {/* Snackbar for Success Message */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={handleCloseSnackbar}
          >
            Password Updated Successfully!
          </MuiAlert>
        </Snackbar>
      </form>
    </div>
  );
};

export default UpdatePassword;

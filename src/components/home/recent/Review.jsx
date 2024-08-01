import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { CircularProgress, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure } from "../../../redux/slice/propertiesSlice";
import { BASE_URL } from "../../../constants/const";

const Review = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { id } = useParams();
  const authorisation = currentUser?.authorisation;
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    review: "",
    rating: null,
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const [loading, setLoading] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [loginRequiredSnackbar, setLoginRequiredSnackbar] = useState(false); // New state for login required toast

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    setLoginRequiredSnackbar(false);
  };

  const createReview = async (e) => {
    e.preventDefault();
    if (!authorisation?.token) {
      setLoginRequiredSnackbar(true); // Show login required toast
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/properties/${id}/reviews`,
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      console.log(response);

      // Fetch updated list of reviews after successful creation
      dispatch(fetchPropertiesStart());
      const updatedResponse = await axios.get(`${BASE_URL}/properties/${id}`);
      if (updatedResponse.status === 200) {
        dispatch(fetchPropertiesSuccess(updatedResponse.data));
        setOpenSuccessSnackbar(true); // Show success toast
      } else {
        throw new Error("Failed to fetch updated properties");
      }

      setValues({
        review: "",
        rating: "",
      });

      setLoading(false);
    } catch (error) {
      setErrorArray(error.response.data.errors);
      console.log(error);
      setLoading(false);
      setOpenErrorSnackbar(true); // Show error toast
    }
  };

  return (
    <div>
      <form onSubmit={createReview}>
        <div className="flex flex-col gap-3">
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Review"
            id="review"
            error={Boolean(errorArray?.review)}
            helperText={errorArray?.review ? errorArray.review.join(", ") : ""}
            value={values.review}
            onChange={handleChange}
          />
          {/*<TextField*/}
          {/*  fullWidth*/}
          {/*  label="Rate 1 to 5"*/}
          {/*  id="rating"*/}
          {/*  type="number"*/}
          {/*  error={Boolean(errorArray?.rating)}*/}
          {/*  helperText={errorArray?.rating ? errorArray.rating.join(", ") : ""}*/}
          {/*  value={values.rating}*/}
          {/*  onChange={handleChange}*/}
          {/*/>*/}
        </div>
        <div className="mt-2">
          <Button variant="outlined" size="medium" type="submit">
            {loading ? <CircularProgress size={25} /> : "Review"}
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSuccessSnackbar || openErrorSnackbar || loginRequiredSnackbar} // Show toast for success, error, or login required
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          openSuccessSnackbar
            ? "Review submitted successfully!"
            : openErrorSnackbar
            ? "Failed to submit review."
            : "Login required to submit a review."
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default Review;

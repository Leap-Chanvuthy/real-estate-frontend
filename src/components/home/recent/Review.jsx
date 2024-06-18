import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Review = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const {id} = useParams();
  const authorisation = currentUser?.authorisation;

  const [values, setValues] = useState({
    review: " ",
    rating: null,
  });

  console.log(values);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorArray, setErrorArray] = useState([]);

  const createReview = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/properties/${id}/reviews`,
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      console.log(response);

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setValues({
          review: "",
          rating: "",
        });
  
      setLoading(false);
    } catch (error) {
      setErrorArray(error.response.data.errors);
      console.log(error);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <div>
      <div className="m-10">
        <h3 className="text-xl font-bold">Review</h3>
        <p className="capitalize">Give us feedback to improve our service</p>
      </div>
      <form className="m-5" onSubmit={createReview}>
        {success &&         <Alert severity="success" color="success" className="w-full my-5">
            Successfully !
          </Alert>}
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
          <TextField
            fullWidth
            label="Rating"
            id="rating"
            type="number"
            error={Boolean(errorArray?.rating)}
            helperText={errorArray?.rating ? errorArray.rating.join(", ") : ""}
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <Button variant="outlined" size="medium" type="submit">
            {loading ? "Loading" : "Review"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Review;

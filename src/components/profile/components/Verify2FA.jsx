import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import { signInSuccess , signInStart , signInFailure } from "../../../redux/slice/authSlice";

const Verify2FA = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 

  const [values, setValues] = useState({
    one_time_password: ""
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false); // Reset success state on new verification attempt

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/verify2fa`, values,
        {
          // headers: { Authorization: `Bearer ${currentUser.authorisation.token}` },
        }
      );

      console.log('verify 2 fa response:', response);

      if (response.status == 200) {
        setValues({one_time_password : ""});
        setSuccess(true); 
        // setTimeout(() => {
        //   window.location.href = "/profile";
        // }, 3000);
      }
    } catch (error) {
      console.error("Error verifying 2FA code:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-10 h-[50vh] ">
      <h3 className="text-xl font-bold text-center my-10">Verify 2 Factor Authentication</h3>
      <form onSubmit={handleVerify} className="mt-4 space-y-4 ">
        {success && (
          <Alert severity="success" className="w-full">
            2 FA Verified Successfully
          </Alert>
        )}
        <TextField
          fullWidth
          id="one_time_password"
          label="2FA Code"
          variant="outlined"
          value={values.one_time_password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Verify2FA;

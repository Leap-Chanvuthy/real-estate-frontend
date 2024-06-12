import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        values
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        setSuccess(true);
        setValues({
          email: "",
          password: "",
        });
        window.location.href = '/';
      } else {
        dispatch(signInFailure(response.data.errors));
      }
    } catch (error) {
      console.error("Login failed", error);
      dispatch(signInFailure(error.response?.data?.errors || "Login failed"));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="w-full p-10 flex flex-col gap-5">
          <h1 className="font-bold text-2xl text-gray-900">
            Login to Your Account
          </h1>
          {success && (
            <Alert severity="success" className="w-full">
              Logged In Successfully!
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full text-start">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="w-full"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={Boolean(error?.email)}
              helperText={error?.email ? error.email.join(', ') : ""}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              className="w-full"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={Boolean(error?.password)}
              helperText={error?.password ? error.password.join(', ') : ""}
            />
            <button
              className="bg-slate-800 px-1 py-2 rounded-sm text-white w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div>
            <p className="font-medium">
              Don't Have an Account Yet?{" "}
              <Link className="text-blue-400" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full hidden lg:md:flex">
          <img src="https://media.istockphoto.com/id/1263319152/vector/woman-holding-keys-from-house-for-sale-and-smiling.jpg?s=612x612&w=0&k=20&c=P3HPAsY-YxeqRLfLzX0l1cnqGZYtuISgfCmbG1NRfNg=" alt="Register illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;

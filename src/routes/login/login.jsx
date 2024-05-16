import { useState } from "react";
import "./login.scss";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import {signInStart, singInSuccess , signInFailure } from "../../redux/auth/authSlice";
import { useSelector , useDispatch } from "react-redux";
import { Spinner , Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";


function Login() {

  const {loading , error} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [success , setSuccess] = useState(false);
  const navigate = useNavigate();

  // initial input values
  const [values , setValues] = useState({
    email : "",
    password : ""
  })


  // getting values from input
  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.id;
    const value = e.target.value;
    setValues({...values , [key] : value});
  }

  

  // handle submit function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post('http://127.0.0.1:8000/api/login' , values , {
        method : 'POST'
      });

      console.log(response);

      const data = response.data;
      const errors = response.data.errors;
      if (response.data.status == 'success'){
        setSuccess(true);
        dispatch(singInSuccess(data))
      }

      setValues({
        email : "",
        password : ""
      })

      setTimeout(() => {
        navigate('/list')
      }, 2500);

    } catch (error){
      dispatch(signInFailure(error));
    }

  }

  
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          {
            success ?         
            <Alert color="success" icon={HiInformationCircle}>
            <p className="font-medium text-black">You've Logged In Successfully </p>
            </Alert> : <></>
          }
          <h1>Welcome back</h1>
          <input  type="text" id="email" onChange={handleChange} placeholder="Username" />
          <input  type="password" id="password" onChange={handleChange} placeholder="Password" />
          <button disabled={loading}>
            {loading ? <Spinner aria-label="Medium sized spinner example" size="md" /> : "Login"}
          </button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

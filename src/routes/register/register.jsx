import "./register.scss";
import { Link , useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { signInStart , singInSuccess , signInFailure } from "../../redux/auth/authSlice";
import axios from 'axios';
import { useState } from "react";
import { Spinner , Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function Register() {


  // initial values
  const [values , setValues] = useState({
    name : "",
    email : "",
    password : "",
    password_confirmation : ""
  })

  // auth state from redux
  const dispatch = useDispatch();
  const {currentUser ,loading , error} = useSelector((state) => state.auth);
  const [success , setSuccess] = useState(false);
  const navigate = useNavigate();


  // Function that handle input values
  const handleChage = (e) => {
    e.preventDefault();
    const key = e.target.id;
    const value = e.target.value;
    setValues({...values , [key] : value })
  }

  // Handle submit function
  const handleSubmit = async (e) =>{
    e.preventDefault();
  

    try{
      dispatch(signInStart());
      const response = await axios.post('http://127.0.0.1:8000/api/register', values , {
        headers : {'Content-Type' : 'application/json'}
      });

      console.log(response);
      const data = response.data;
      const errors = response.data.errors;
      if (response.data.status === 'success'){
        setSuccess(true);
        dispatch(singInSuccess({data}));
        setValues({
          name : "",
          email : "",
          password : "",
          password_confirmation : ""
        })
        setTimeout(() => {
          navigate('/list');
        }, 2500);
      }

      if (response.status !== 200){
        dispatch(signInFailure(errors));
        setSuccess(false);
      }
    }
    catch (error){
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
        {success ? 
        <Alert color="success" icon={HiInformationCircle}>
          <p className="font-medium text-black">You've Sigged In Successfully </p>
        </Alert> : <></>
        }
          <h1>Create an Account</h1>
          <input id="name" type="text" placeholder="Username" value={values.name} onChange={handleChage} />
          <input id="email" type="text" placeholder="Email" value={values.email} onChange={handleChage} />
          <input id="password" type="password" placeholder="Password" value={values.password} onChange={handleChage} />
          <input id="password_confirmation" type="password" placeholder="Password" value={values.password_confirmation} onChange={handleChage} />
          <button disabled={loading}>
            {loading ? <Spinner aria-label="Medium sized spinner example" size="md" /> : "Register"}
          </button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;

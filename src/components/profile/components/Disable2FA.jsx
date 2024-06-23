// import axios from "axios";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { CircularProgress, Button } from '@mui/material';
// import { updateUserProfile } from "../../../redux/slice/authSlice";

// const Disable2FA = () => {
//   const { currentUser } = useSelector((state) => state.auth);
//   const authorisation = currentUser?.authorisation;
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   const handleDisable2FA = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/disable2fa",
//         null,
//         {
//           headers: { Authorization: `Bearer ${authorisation.token}` },
//         }
//       );

//       if (response.status === 200) {
//         setLoading(false);
//         const updatedUser = { ...currentUser.user, two_fa_enabled: 0 };
//         const updatedCredentials = { ...currentUser, user: updatedUser };
//         dispatch(updateUserProfile(updatedCredentials));
//       }
//     } catch (error) {
//       console.error("Error disabling 2FA:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row justify-between items-start gap-10 my-10">
//       <div className="w-full">
//         <h3 className="text-xl font-bold">Disable Two-Factor Authentication</h3>
//         <p className="text-red-400">
//           Disable an extra layer with Two-Factor Authentication. Use Google Authenticator to secure your account.
//         </p>
//         <div className="mt-5">
//           <Button variant="outlined" size="medium" color="error" onClick={handleDisable2FA} disabled={loading}>
//             {loading ? <CircularProgress size={25} color="error" /> : "Disable"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Disable2FA;


import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Button } from '@mui/material';
import { updateUserProfile } from "../../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const Disable2FA = ({ qrImage, on2FADisabled }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const authorisation = currentUser?.authorisation;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleDisable2FA = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/disable2fa",
        null,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        const updatedUser = { ...currentUser.user, two_fa_enabled: 0 };
        const updatedCredentials = { ...currentUser, user: updatedUser };
        dispatch(updateUserProfile(updatedCredentials));
        on2FADisabled();  // Notify parent component
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-10 my-10">
      <div className="w-full">
        <h3 className="text-xl font-bold">Disable Two-Factor Authentication</h3>
        <p className="text-red-400">
          Disable an extra layer with Two-Factor Authentication. Use Google Authenticator to secure your account.
        </p>
        <div className="mt-5">
          <Button variant="outlined" size="medium" color="error" onClick={handleDisable2FA} disabled={loading}>
            {loading ? <CircularProgress size={25} color="error" /> : "Disable"}
          </Button>
        </div>
      </div>
      {qrImage && (
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-6 lg:mt-0">
          <div className="flex justify-center items-center mb-4 p-4 border border-gray-300 rounded-md" style={{ width: "200px", height: "200px" }}>
            <div dangerouslySetInnerHTML={{ __html: qrImage }} />
          </div>
        </div>
      )}
      {qrImage &&
          <p className="text-lg my-3">
            Thank you for initiating the process. To complete your action, please verify your identity by entering the One Time Password (OTP) in Your Google Authenticator <Link to='verify2fa' className="text-blue-600 font-light text-sm underline">Click Here to Verify OTP</Link>.
          </p>
        }
    </div>
  );
};

export default Disable2FA;

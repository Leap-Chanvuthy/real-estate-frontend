// import axios from "axios";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { CircularProgress, Button } from '@mui/material';
// import { updateUserProfile } from "../../../redux/slice/authSlice";
// import { Link } from "react-router-dom";

// const Enable2FA = ({ on2FAEnabled }) => {
//   const { currentUser } = useSelector((state) => state.auth);
//   const authorisation = currentUser?.authorisation;
//   const dispatch = useDispatch();

//   const [QRImage, setQRImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleEnable2FA = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/enable2fa",
//         null,
//         {
//           headers: { Authorization: `Bearer ${authorisation.token}` },
//         }
//       );

//       if (response.status === 200) {
//         setLoading(false);
//         setQRImage(response.data.QR_Image);
//         const updatedUser = { ...currentUser.user, two_fa_enabled: 1 };
//         const updatedCredentials = { ...currentUser, user: updatedUser };
//         dispatch(updateUserProfile(updatedCredentials));
//         on2FAEnabled();
//       }
//     } catch (error) {
//       console.error("Error enabling 2FA:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">
//       <div className="w-full lg:w-1/2">
//         <h3 className="text-2xl font-bold mb-4">Two-Factor Authentication</h3>
//         <p className="text-lg mb-6">
//           Add an extra layer of security with Two-Factor Authentication. Use Google Authenticator to secure your account.
//         </p>
//         <Button variant="outlined" size="medium" onClick={handleEnable2FA} disabled={loading}>
//           {loading ? <CircularProgress size={25} /> : "Enable"}
//         </Button>
//       </div>
//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-6 lg:mt-0">
//         {QRImage && (
//           <div className="flex justify-center items-center mb-4 p-4 border border-gray-300 rounded-md" style={{ width: "200px", height: "200px" }}>
//             <div dangerouslySetInnerHTML={{ __html: QRImage }} />
//           </div>
//         )}
//         {QRImage &&
//           <p className="text-lg my-3">
//             Thank you for initiating the process. To complete your action, please verify your identity by entering the One Time Password (OTP) in Your Google Authenticator <Link to='verify2fa' className="text-blue-600 font-light text-sm underline">Click Here to Verify OTP</Link>.
//           </p>
//         }
//       </div>
//     </div>
//   );
// };

// export default Enable2FA;


import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Button } from '@mui/material';
import { updateUserProfile } from "../../../redux/slice/authSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/const";

const Enable2FA = ({ on2FAEnabled }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const authorisation = currentUser?.authorisation;
  const dispatch = useDispatch();

  const [QRImage, setQRImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/enable2fa`,
        null,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setQRImage(response.data.QR_Image);
        const updatedUser = { ...currentUser.user, two_fa_enabled: 1 };
        const updatedCredentials = { ...currentUser, user: updatedUser };
        dispatch(updateUserProfile(updatedCredentials));
        on2FAEnabled(response.data.QR_Image);  // Pass QRImage to parent
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">
      <div className="w-full lg:w-1/2">
        <h3 className="text-2xl font-bold mb-4">Two-Factor Authentication</h3>
        <p className="text-lg mb-6">
          Add an extra layer of security with Two-Factor Authentication. Use Google Authenticator to secure your account.
        </p>
        <Button variant="outlined" size="medium" onClick={handleEnable2FA} disabled={loading}>
          {loading ? <CircularProgress size={25} /> : "Enable"}
        </Button>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-6 lg:mt-0">
        {QRImage && (
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center mb-4 p-4 border border-gray-300 rounded-md" style={{ width: "200px", height: "200px" }}>
              <div dangerouslySetInnerHTML={{ __html: QRImage }} />
            </div>
            <p className="text-lg my-3">
              Thank you for initiating the process. To complete your action, please verify your identity by entering the One-Time Password (OTP) in Your Google Authenticator. <Link to='verify2fa' className="text-blue-600 font-light text-sm underline">Click here to verify OTP.</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enable2FA;

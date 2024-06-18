import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import {CircularProgress , Button} from '@mui/material';
import { updateUserProfile } from "../../../redux/slice/authSlice";

const Enable2FA = () => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  const authorisation = currentUser?.authorisation;
  const dispatch = useDispatch();

  const [QRImage, setQRImage] = useState(null);
  const [loading , setLoading] = useState(false);

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enable2fa",
        null,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );

      if (response.status == 200) {
        setLoading(false);
        setQRImage(response.data.QR_Image);
        console.log(response);
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
  };

  return (
    <div className="flex flex-col lg:md:flex-row justify-between items-start gap-10 my-10">
      <div className="w-full">
        <h3 className="text-xl font-bold">Two Factors Authentication</h3>
        <p>
          Add an Extra Layer With Two Factors Authentication. Use Google
          Authenticator to Secure Your Account.
        </p>
        <div className="mt-5">
            <Button variant="outlined" size="medium" onClick={handleEnable2FA}>
              {loading ? <CircularProgress size={25} /> : "Enable"}
            </Button>
        </div>
        {/* <div className="mt-5">
          <strong>Steps :</strong>
          <ul>
            <li>Click Enable</li>
            <li>Scan QR Code In Google Authenticator</li>
            <li>Enter Your OTP Code</li>
            <li className="font-bold text-green-500">Done ✔</li>
          </ul>
        </div> */}
      </div>
      <div className="w-full ">
        <div className="flex">
          {QRImage && (
            <div
              dangerouslySetInnerHTML={{ __html: QRImage }}
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Enable2FA;

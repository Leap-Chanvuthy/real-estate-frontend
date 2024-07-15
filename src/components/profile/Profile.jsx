import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import Enable2FA from "./components/Enable2FA";
import Disable2FA from "./components/Disable2FA";
import { updateUserProfile } from "../../redux/slice/authSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user = currentUser?.user;
  const authorisation = currentUser?.authorisation;

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const [errorArray, setErrorArray] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(user.two_fa_enabled);
  const [qrImage, setQrImage] = useState(null);  // State to store QR code image

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/profile/update",
        values,
        {
          headers: { Authorization: `Bearer ${authorisation.token}` },
        }
      );
      if (response.status === 200) {
        const updatedCredentials = { ...currentUser, user: response.data.data };
        dispatch(updateUserProfile(updatedCredentials));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorArray(error.response.data.errors);
      setLoading(false);
    }
  };

  const handle2FAEnabled = (qrCode) => {
    setIs2FAEnabled(true);
    setQrImage(qrCode);  // Store QR code image when 2FA is enabled
  };

  const handle2FADisabled = () => {
    setIs2FAEnabled(false);
    setQrImage(null);  // Clear QR code image when 2FA is disabled
  };

  return (
    <div className="mx-10">
      <UpdateProfile />
      <hr />
      <UpdatePassword />
      <hr />
      <div>
        {is2FAEnabled ? <Disable2FA qrImage={qrImage} on2FADisabled={handle2FADisabled} /> : <Enable2FA on2FAEnabled={handle2FAEnabled} />}
      </div>
    </div>
  );
};

export default Profile;

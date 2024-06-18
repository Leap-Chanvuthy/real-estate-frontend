import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import {CircularProgress , Button} from '@mui/material';

const Disable2FA = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const authorisation = currentUser?.authorisation;

  const [loading , setLoading] = useState(false);

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
        console.log('Diable 2 fa response :' , response);
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
    }
  };

  return (
    <div className="flex flex-col lg:md:flex-row justify-between items-start gap-10 my-10">
      <div className="w-full">
        <h3 className="text-xl font-bold">Disable Two Factors Authentication</h3>
        <p className="text-red-400">
          Disable an Extra Layer With Two Factors Authentication. Use Google
          Authenticator to Secure Your Account.
        </p>
        <div className="mt-5">
            <Button variant="outlined" size="medium" color="error" onClick={handleDisable2FA}>
              {loading ? <CircularProgress size={25} color="error" /> : "Disable"}
            </Button>
        </div>
      </div>
      {/* <div className="w-full ">
        <div className="flex">
          {QRImage && (
            <div
              dangerouslySetInnerHTML={{ __html: QRImage }}
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Disable2FA;

import { useSelector , useDispatch } from "react-redux";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";

const Profile = () => {

    const {currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const user = currentUser?.user;
    console.log(user);

    const handleLogout = () => {
        dispatch(logout());
        persistor.purge(); // Clear persisted storage
        window.location.href = '/'; // Redirect to login page
      };

  return (
    <div >
        <div className="flex justify-between">
          
        </div>
    </div>
  );
};

export default Profile;

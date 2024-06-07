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
        <h1 className="text-center my-5 text-lg font-bold">Account Information</h1>
        <div className="flex flex-col bg-gradient-to-r h-[50vh] from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg md:flex-row md:space-x-6 h-80vh">
          <div className="flex items-center space-x-6">
            <img
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7RWP-ntuHhdxDONcT9QCkUuQd9bXLgoYSQ&s"
              alt="Profile"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex-grow mt-6 md:mt-0">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Username:</span> {user.name}
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Gender:</span> Your First Name
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Country:</span> Your First Name
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Language:</span> Your First Name
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Time Zone:</span> Your First Name
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Email Address:</span>
                <br />
                <span className="text-blue-500">{user.email}</span>
              </li>
              <li className="text-gray-600">
                <span className="font-bold text-gray-800">Created At:</span> 1 month ago
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5 justify-end md:items-end">
            <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md shadow-sm md:mt-0">
              Edit Profile
            </button>
            <button onClick={handleLogout} className="mt-6 px-6 py-2 bg-red-400 w-full text-white rounded-md shadow-sm md:mt-0">
              Logout
            </button>
          </div>
        </div>
    </div>
  );
};

export default Profile;

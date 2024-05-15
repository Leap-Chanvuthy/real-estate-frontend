import { useState } from "react";
import "./navbar.scss";
import { Link , useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistor } from "../../redux/store";

function Navbar() {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const path = useLocation().pathname;
  const navigate = useNavigate();


  const logout = async () => {
    await persistor.purge();
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  return (
    <nav>
      <div className="left text-lg font-bold">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span className="">LamaEstate</span>
        </a>
        <Link to="/" className={`${path == '/' ? 'text-yellow-400' : ""}`}>Home</Link>
        <Link to="/list" className={`${path == '/list' ? 'text-yellow-400' : ""}`}>Find Estate</Link>
        <Link to='/create' className={`${path == '/create' ? 'text-yellow-400' : ""}`}>Post</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            {/* <span>{currentUser.data.user.name}</span> */}
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
            <button className="border-2 border-red-400 py-3 px-6 text-red-400 rounded-md" onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            {/* <Link href="/list">Sign in</Link> */}
            <Link to="/register"><button className="border-2 border-yellow-400 py-2 px-4 rounded-md text-yellow-400 cursor-pointer">Sign Up</button></Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a className="text-red-500" href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

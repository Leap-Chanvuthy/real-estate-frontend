import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';

const Header = () => {
  const [navList, setNavList] = useState(false);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  const user = currentUser?.user;
  console.log(user);

  return (
    <header>
      <div className='container flex'>
        <div className='logo'>
          {/* <img src='./images/logo.png' alt='Logo' /> */}
          My Estate
        </div>
        <div className='nav'>
          <ul className={navList ? "small" : "flex"}>
            {nav.map((list, index) => (
              <li key={index}>
                <Link to={list.path} className={pathname === list.path ? "text-green-600" : ""}>
                  {list.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user ? 
        <div className="hidden lg:md:flex">
          <Link to="/profile">
            <Avatar alt="Remy Sharp" src={`${user.profile_image == null ? '/static/images/avatar/1.jpg' : user.profile_image}`} />
          </Link>
        </div>
        :
        <div className='button flex'>
          <h4>
            <span>2</span> My List
          </h4>
          <button className='btn1'>
            <i className='fa fa-sign-out'></i>
            <Link to='/register'>Sign In</Link>
          </button>
        </div>
        }

        <div className='toggle'>
          <div className="flex gap-3">
            {user ?
              <Link to="/profile">
                <Avatar alt="Remy Sharp" src={`${user.profile_image == null ? '/static/images/avatar/1.jpg' : user.profile_image}`} />
              </Link>
              :<></>
            }
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

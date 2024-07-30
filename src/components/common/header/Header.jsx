// import React, { useState } from "react";
// import "./header.css";
// import { nav } from "../../data/Data";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Avatar from '@mui/material/Avatar';

// const Header = () => {
//   const [navList, setNavList] = useState(false);
//   const { pathname } = useLocation();
//   const { currentUser } = useSelector((state) => state.auth);

//   const user = currentUser?.user;

//   return (
//     <header>
//       <div className='container flex'>
//         <div className='logo'>
//           {/* <img src='./images/logo.png' alt='Logo' /> */}
//           My Estate
//         </div>
//         <div className='nav'>
//           <ul className={navList ? "small" : "flex"}>
//             {nav.map((list, index) => (
//               <li key={index}>
//                 <Link to={list.path} className={pathname === list.path ? "text-green-600" : ""}>
//                   {list.text}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {user ? 
//         <div className="hidden lg:md:flex">
//           <Link to="/profile">
//             <Avatar alt="Remy Sharp" src={`${user.profile_image == null ? '/static/images/avatar/1.jpg' : user.profile_image}`} />
//           </Link>
//         </div>
//         :
//         <div className='button flex'>
//           <h4>
//             <span>2</span> My List
//           </h4>
//           <button className='btn1'>
//             <i className='fa fa-sign-out'></i>
//             <Link to='/register'>Sign In</Link>
//           </button>
//         </div>
//         }

//         <div className='toggle'>
//           <div className="flex gap-3">
//             {user ?
//               <Link to="/profile">
//                 <Avatar alt="Remy Sharp" src={`${user.profile_image == null ? '/static/images/avatar/1.jpg' : user.profile_image}`} />
//               </Link>
//               :<></>
//             }
//             <button onClick={() => setNavList(!navList)}>
//               {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { FaBars, FaTimes } from 'react-icons/fa'; // Using React Icons for better consistency
import { nav } from "../../data/Data";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { Button } from "@mui/material";

const Header = () => {
  const [navListOpen, setNavListOpen] = useState(false);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  const {items} = useSelector((state) => state.favourites);
  const count = items.length;
  const user = currentUser?.user;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="logo text-2xl font-bold">
          My Estate
        </div>

        <nav className={`nav ${navListOpen ? "block" : "hidden"} lg:flex`}>
          <ul className="flex items-center gap-7 font-medium">
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-lg ${pathname === item.path ? "text-[#4287f5]" : "text-gray-800"} hover:text-[#4287f5]`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <Link to="/favourites">
              <div className="relative inline-flex items-center justify-center border-2 border-gray-200 p-2 rounded-full bg-white">
                <BsBookmarkHeartFill className="text-[#4287f5] text-2xl" />
                <p className="absolute top-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                    {count}
                </p>
              </div>
            </Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/profile" className="hidden lg:flex">
              <Avatar alt={user.name} src={user.profile_image || '/static/images/avatar/1.jpg'} />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/register" className="text-blue-500 hover:text-blue-700">
                <Button variant="outlined" >Sign In</Button>
              </Link>
            </div>
          )}

          <button
            className="lg:hidden text-2xl"
            onClick={() => setNavListOpen(!navListOpen)}
          >
            {navListOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

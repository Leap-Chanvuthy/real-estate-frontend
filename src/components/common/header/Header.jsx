// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Avatar from '@mui/material/Avatar';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { nav } from "../../data/Data";
// import { BsBookmarkHeartFill } from "react-icons/bs";
// import { Button } from "@mui/material";

// const Header = () => {
//   const [navListOpen, setNavListOpen] = useState(false);
//   const { pathname } = useLocation();
//   const { currentUser } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.favourites);
//   const count = items.length;
//   const user = currentUser?.user;

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         <div className="logo text-2xl font-bold">
//           <img src="/favicon.png" className="w-10 h-10" />
//         </div>

//         <nav className={`fixed top-0 left-0 w-1/2 h-full bg-white transform ${navListOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex lg:items-center lg:bg-transparent lg:h-auto lg:w-auto`}>
//           <ul className="flex flex-col lg:flex-row items-center gap-7 font-medium p-4 lg:p-0">
//             {nav.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className={`text-lg ${pathname === item.path ? "text-[#4287f5]" : "text-gray-800"} hover:text-[#4287f5]`}
//                 >
//                   {item.text}
//                 </Link>
//               </li>
//             ))}
//             <Link to="/favourites" className="flex items-center lg:hidden">
//               <div className="relative inline-flex items-center justify-center border-2 border-gray-200 p-2 rounded-full bg-white">
//                 <BsBookmarkHeartFill className="text-[#4287f5] text-2xl" />
//                 <p className="absolute top-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
//                   {count}
//                 </p>
//               </div>
//             </Link>
//             {user ? (
//               <Link to="/profile" className="flex items-center lg:hidden">
//                 <Avatar alt={user.name} src={user.profile_image || '/static/images/avatar/1.jpg'} />
//               </Link>
//             ) : (
//               <Link to="/register" className="flex items-center text-blue-500 hover:text-blue-700 lg:hidden">
//                 <Button variant="outlined">Sign In</Button>
//               </Link>
//             )}
//           </ul>
//         </nav>

//         <div className="flex items-center gap-4">
//           <Link to="/favourites" className="flex items-center hidden lg:flex">
//             <div className="relative inline-flex items-center justify-center border-2 border-gray-200 p-2 rounded-full bg-white">
//               <BsBookmarkHeartFill className="text-[#4287f5] text-2xl" />
//               <p className="absolute top-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
//                 {count}
//               </p>
//             </div>
//           </Link>
//           {user ? (
//             <Link to="/profile" className="hidden lg:flex">
//               <Avatar alt={user.name} src={user.profile_image || '/static/images/avatar/1.jpg'} />
//             </Link>
//           ) : (
//             <Link to="/register" className="hidden lg:flex text-blue-500 hover:text-blue-700">
//               <Button variant="outlined">Sign In</Button>
//             </Link>
//           )}
//           <button
//             className="text-2xl"
//             onClick={() => setNavListOpen(!navListOpen)}
//           >
//             {navListOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Avatar from '@mui/material/Avatar';
import {FaBars, FaTimes} from 'react-icons/fa';
import {nav} from "../../data/Data";
import {BsBookmarkHeartFill} from "react-icons/bs";
import {Button} from "@mui/material";

const Header = () => {
    const [navListOpen, setNavListOpen] = useState(false);
    const {pathname} = useLocation();
    const {currentUser} = useSelector((state) => state.auth);
    const {items} = useSelector((state) => state.favourites);
    const count = items.length;
    const user = currentUser?.user;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="logo text-2xl font-bold">
                    <img src="/favicon.png" className="w-10 h-10"/>
                </div>

                {/* Hamburger icon for small screens */}
                <button
                    className="text-2xl lg:hidden"
                    onClick={() => setNavListOpen(!navListOpen)}
                >
                    {navListOpen ? <FaTimes/> : <FaBars/>}
                </button>

                {/* Navigation for small screens */}
                <nav
                    className={`fixed top-0 left-0 w-1/2 h-full bg-white transform ${navListOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex lg:items-center lg:bg-transparent lg:h-auto lg:w-auto`}>
                    <ul className="flex flex-col lg:flex-row items-center gap-7 font-medium p-4 lg:p-0">
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`text-lg ${pathname === item.path ? "text-[#4287f5]" : "text-gray-800 font-bold"} hover:text-[#4287f5]`}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <Link to="/favourites" className="flex items-center lg:hidden">
                            <div
                                className="relative inline-flex items-center justify-center border-2 border-gray-200 p-2 rounded-full bg-white">
                                <BsBookmarkHeartFill className="text-[#4287f5] text-2xl"/>
                                <p className="absolute top-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                                    {count}
                                </p>
                            </div>
                        </Link>
                        {user ? (
                            <Link to="/profile" className="flex items-center lg:hidden">
                                <Avatar alt={user.name} src={user.profile_image || '/static/images/avatar/1.jpg'}/>
                            </Link>
                        ) : (
                            <Link to="/register"
                                  className="flex items-center text-blue-500 hover:text-blue-700 lg:hidden">
                                <Button variant="outlined">Sign In</Button>
                            </Link>
                        )}
                    </ul>
                </nav>

                {/* Desktop navigation links and icons */}
                <div className="flex items-center gap-4 lg:flex hidden">
                    {currentUser &&
                        <Link to="/favourites" className="flex items-center">
                            <div
                                className="relative inline-flex items-center justify-center border-2 border-gray-200 p-2 rounded-full bg-white">
                                <BsBookmarkHeartFill className="text-[#4287f5] text-2xl"/>
                                <p className="absolute top-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                                    {count}
                                </p>
                            </div>
                        </Link>
                    }

                    {user ? (
                        <Link to="/profile" className="flex items-center">
                            <Avatar alt={user.name} src={user.profile_image || '/static/images/avatar/1.jpg'}/>
                        </Link>
                    ) : (
                        <Link to="/register" className="text-blue-500 hover:text-blue-700">
                            <Button variant="outlined">Sign In</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

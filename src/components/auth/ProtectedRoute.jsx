// import React from "react";
// import { Route } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useSelector((state) => state.auth);
//   const user = currentUser?.user;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? window.location.href = '/' : <Component {...props} />
//       }
//     />
//   );
// };

// export default ProtectedRoute;


import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Note: In react-router-dom v6, use the `element` prop instead of `component` prop
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.user;
  const location = useLocation(); // To pass the current location to Navigate

  return (
    <Route
      {...rest}
      element={user ? <Navigate to="/" state={{ from: location }} /> : <Component />}
    />
  );
};

export default ProtectedRoute;

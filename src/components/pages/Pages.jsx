import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Detail from '../home/recent/Detail';
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import Profile from "../profile/Profile";
import Verify2FA from "../profile/components/Verify2FA";
import FavoritesList from "../favourite/FavouritesList";
import CrispChat from "../../crisp/Chat";
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FaTimes } from 'react-icons/fa';

const Pages = () => {

  const {currentUser} = useSelector((state) => state.auth);
  const user = currentUser?.user;
  const [openSnackbar, setOpenSnackbar] = React.useState(!user);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(user);
  };

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/property/:id" component={Detail} />
        {/* <Route path="/chat" component={CrispChat} /> */}
        <Route path="/about" component={About} />
        {/*<Route path="/services" component={Services} />*/}
        <Route path="/property" component={Blog} />
        {/*<Route path="/pricing" component={Pricing} />*/}
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/verify2fa" component={Verify2FA} />
        <Route path="/favourites" component={FavoritesList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      <div>
        {user ? <CrispChat /> : 
          <Snackbar
          open={!user}
          onClose={handleCloseSnackbar}
          message="You need to be logged in to use the chat feature."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          action={
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={handleCloseSnackbar}
            >
              <FaTimes size={20} />
            </div>
          }
        >
          <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
            Login Required To Use Chat Feature
          </Alert>
        </Snackbar>
         }
      </div>
      
      <Footer />
    </BrowserRouter>
  );
};

export default Pages;

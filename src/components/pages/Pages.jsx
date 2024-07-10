import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Detail from '../home/recent/Detail'
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
import Verify2FA from "../profile/components/Verify2FA";

const Pages = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.user;
  console.log(currentUser)

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/property/:id" component={Detail} />
        <Route exact path="/about" component={About} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/property" component={Blog} />
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/verify2fa" component={Verify2FA}/>
        <ProtectedRoute exact path="/register" component={Register} />
        <ProtectedRoute exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Pages;

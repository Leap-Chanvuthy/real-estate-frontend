import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const Pages = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/property" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify2fa" element={<Verify2FA />} />
        <Route path="/favourites" element={<FavoritesList />} />
        <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Pages;

import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            <p>The Real Estate Platform project is designed to provide a comprehensive solution for the real estate industry, consisting of three main components: a Content Management System (CMS) for Admins, a website for users and agencies, and a mobile app for users and agencies. These components collectively facilitate property listings, searches, and transactions, ensuring a seamless and efficient experience for all stakeholders involved. </p>
            <p>Customers, or end-users, can browse and search for property listings, create and manage personal profiles, contact agencies to schedule property viewings, submit and manage property inquiries, and view their saved properties and search history. These features aim to provide a user-friendly experience for individuals looking to buy or rent properties. </p>
            <p>Companies, which may include real estate firms or individual realtors, have the capability to create and manage agency profiles, add and manage property listings, respond to user inquiries, schedule property viewings, and view analytics and performance reports. This empowers companies to effectively manage their property listings and interactions with potential clients. </p>
            <p>Agencies can create and manage their profiles, add and manage property listings, respond to user inquiries, schedule property viewings, and view analytics and performance reports. These functionalities enable agencies to efficiently manage their properties and engage with users. </p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About

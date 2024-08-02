import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import Company from "./companies/Company";

const Home = () => {
    return (
        <>
            <Hero/>
            <Recent/>
            <Featured/>
            <Company/>
            {/*<Awards />*/}
            <Location/>
            <Team/>
            {/*<Price />*/}
        </>
    )
}

export default Home

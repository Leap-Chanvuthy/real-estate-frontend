import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Offer a fresh selection of homes and commercial spaces that have just entered the market. These listings represent the latest opportunities for buyers and investors to find their ideal property, whether they’re seeking a cozy family home, a modern apartment, or a prime commercial location.' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent

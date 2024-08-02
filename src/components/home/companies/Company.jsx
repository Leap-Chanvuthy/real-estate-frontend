import React from "react"
import Heading from "../../common/Heading"
import "./Company.css"
import CompanyCard from "./CompanyCard"


const Company = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='Our Partners' subtitle='Top companies with the most properties' />
          <CompanyCard />
        </div>
      </section>
    </>
  )
}

export default Company

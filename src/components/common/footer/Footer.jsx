import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"

const Footer = () => {
  return (
    <>
      {/* <section className='footerContact'>
        <div className='container'>
          <div className='send '>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <div className='bg-white w-[10rem] text-black mt-3 p-4 rounded-full'>Contact Us Today</div>
          </div>
        </div>
      </section> */}

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='/favicon.png' className="w-20 h-20" alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span>© 2024 Real Estate. Made with ❤️ by Real Esate Team Capstone Project .</span>
      </div>
    </>
  )
}

export default Footer

import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className ='flex flex-col sm:grid grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt=""/>
          <p className='w-full md:w-2/3 text-gray-600'>
          MedKift is an instant pharmacy delivery web platform that allows users to quickly order medicines online. The system supports prescription uploads, secure payments, and real-time tracking, ensuring a seamless and reliable experience for customers in need of timely medical supplies.
          </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY </p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>SUPPORT</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>contact us</li>
            <li>medkift@gmail.com</li>
          </ul>

        </div>
        
        </div> 
    </div>
  )
}

export default Footer

import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>MedSwift revolutionizes healthcare access by delivering genuine medicines in under 30 minutes. We bridge the gap between pharmacies and patients, ensuring critical medications reach you fast, safely, and reliably.</p>
             <p>✅ Lightning-Fast Delivery

Get prescriptions and OTC medicines delivered in minutes.

Real-time tracking with live driver updates.

✅ 100% Authentic Medicines

Sourced only from licensed pharmacies.

Verified expiration dates and batch numbers.

✅ Smart Prescription Management

Upload prescriptions via app/website.

AI-powered validation for safety.

✅ Seamless Experience

Easy reordering for chronic medications.

Scheduled deliveries for regular needs.

✅ Safety First

HIPAA-compliant data handling.

Tamper-proof packaging.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>At MedSwift, we believe that access to essential medicines should be fast, reliable, and hassle-free. Our mission is to revolutionize healthcare delivery by:

Saving Lives in Minutes

Providing instant, on-demand delivery of prescription and over-the-counter medications—because emergencies can’t wait.

Guaranteeing Authenticity

Partnering only with licensed pharmacies to ensure every product is 100% genuine, properly stored, and safety-checked.

Bridging Healthcare Gaps

Serving remote areas, elderly patients, and busy professionals with a seamless digital healthcare experience.

Innovating for Tomorrow

Using AI-driven logistics and real-time tracking to set new standards in pharmaceutical delivery efficiency.

Every second counts. We deliver more than medicines—we deliver peace of mind.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About

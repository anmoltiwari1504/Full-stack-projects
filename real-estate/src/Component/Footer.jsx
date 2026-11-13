import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

function Footer() {
  return (
    <motion.div
         initial={{ opacity: 0, y:100 }}
        transition={{duration:1}}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{once:true} }
      className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900  w-full overflow-hidden ' id='footer'>
      <div className='flex flex-col container mx-auto md:flex-row justify-between items-center'>
        <div className='w-full md:w-1/3 mb-8 md:mb-0' >
          <img src={assets.logo_dark} alt="" />
        <p className='text-gray-400 mt-4 '>hey this is a footer and i am anmol tiwari this is my second project using react js.</p></div>
        <div className='w-full md:w-1/5 mb-8 md:mb-0'>
          <h3 className='text-white text-lg font-bold mb-4 '>Company</h3>
          <ul className='flex flex-col  gap-2 text-gray-400'>
            <a href="#header" className='hover:text-white'>Home</a>
            <a href="#about" className='hover:text-white'>About us </a>
            <a href="#contact" className='hover:text-white'>Contact us</a>
            <a href="#header" className='hover:text-white'>Privacy policy</a>
          </ul>
        </div>
        <div className='w-full md:w-1/3'>
          <h3 className='text-white text-lg font-bold mb-4 '>Subscribe to out news letter </h3>
          <p className='text-gray-400 mb-4 mx-w-80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div>
            <input type="text" placeholder='Enter your email' className='p-2 rounded  bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto' />
             <button type="submit" className='bg-blue-600 text-white py-2 px-12 mb-10 rounded ml-2.5 '>Subscribe</button>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'> 
        Copyright 2026 Anmol All Right Reserved.
      </div>
    </motion.div>
  )
}

export default Footer

import React, { useEffect, useState } from 'react'
import {assets } from '../assets/assets'

const Navbar = ({setForm}) => {
  const [show, setShow] = useState(false)
  // "Prevent background scrolling"
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    }
    else {
      
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
      
    }
  },[show])
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent  '>
        <img src={assets.logo} alt="" />
        <ul className='hidden md:flex  gap-7 text-white'>
          <a href="#header" className='cursor-pointer hover:text-gray-400'>Home</a>
          <a href="#about" className='cursor-pointer hover:text-gray-400'>About</a>
          <a href="#project" className='cursor-pointer hover:text-gray-400'>Projects</a>
          <a href="#testimonials" className='cursor-pointer hover:text-gray-400'>Testimonials</a>
        </ul>
        <button  onClick={()=> setForm(true)} className='hidden md:block bg-white px-8 py-2 rounded-full'>SignUp</button>
        <img onClick={()=> setShow(true)} src={assets.menu_icon}  className="md:hidden w-7 cursor-pointer"  alt="" />
      </div>
      {/* mobile menu */}
    <div className={`md:hidden  ${show ? "fixed w-full ":  'h-0 w-0 '} fixed w-full right-0 top-0 bottom-0 overflow-hidden bg-white transition-all  duration-300`}>
      <div className='flex justify-end p-6  cursor-pointer'>
           <img onClick={()=> setShow(false)} src={assets.cross_icon } className='w-6 ' alt="" />
         </div>
        <ul className='flex flex-col items-center gap-2 mt-5 mx-5 text-large font-medium '>
          <a  onClick={()=> setShow(false)}  href="#header" className='px-4 py-2 rounded-full inline-block'>Home</a>
          <a  onClick={()=> setShow(false)}  href="#about" className='px-4 py-2 rounded-full inline-block'>About</a>  
          <a   onClick={()=> setShow(false)} href="#project" className='px-4 py-2 rounded-full inline-block'>Project</a>
          <a   onClick={()=> setShow(false)} href="#testimonial" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
        </ul>
      </div>
      </div>
    
  )
}

export default Navbar

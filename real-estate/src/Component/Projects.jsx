import React, { useEffect, useState } from 'react'
import { assets, projectsData } from '../assets/assets'
import { motion } from "motion/react"

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState(1);
  const nextproject = () => {
    setIndex((prevIndex   )=>(prevIndex +1 ) % projectsData.length)
  }
  const prevproject = () => {
    setIndex((prevIndex) => prevIndex === 0 ? projectsData.length-1: prevIndex-1)
  }
  useEffect(() => {
    const updatecard = () => {
      if (window.innerWidth >= 1024) {
        setCards(projectsData.length)
      }
      else {
        setCards(1)
      }
    }
      updatecard();
      window.addEventListener('resize', updatecard)
      return ()=>window.removeEventListener('resize' , updatecard())
  },[])
  return (
    <motion.div
         initial={{ opacity: 0, x: -200 }}
        transition={{duration:1}}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{once:true} }
      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='project'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Projects <span className='underline underline-offset-4 decoration-1 under font-light'>Completed</span></h1>
      <p className='text-center text-gray-700 mb-8 max-w-80 mx-auto '>Crafting spaces, Buliding Legacies-Explore Our portfolio</p>
      {/* slider button */}
      <div className='flex justify-end  items-center mb-8'>
        <button
        onClick={prevproject}><img src={assets.left_arrow} alt="Previous" className='p-3 bg-gray-200 rounded mr-2' aria-level='previous project' /></button>
        <button
        onClick={nextproject}><img src={assets.right_arrow} alt="Next" className='p-3 bg-gray-200 rounded mr-2' aria-level='Next project' /></button>
        
      </div>
      {/* project slider container  */}
      <div className='overflow-hidden'>  
        <div className='flex  gap-8 transition-transform duration-500 ease-in-out '
        style={{transform:`translateX(-${(index * 100) / cards}%)`}}>
          {projectsData.map((project, index) => (
            <div key={index} className='relative shrink-0 w-full sm:w-1/4'>
              <img src={project.image} alt={project.title} className='w-full h-auto mb-14' />
              <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                  <h2
                    className='text-xl  font-semibold text-gray-800'>{project.title}</h2>
                  <p className='text-sm text-gray-700'>
                    {project.price} <span className='px-1'>|</span> {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  )
}

export default Projects

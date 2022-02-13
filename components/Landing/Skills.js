import React from "react"
// ASSETS
import skills from "../../utils/skillsData"
import Image from "next/image"

const Skills = ({ skillsRef }) => {
  return (
    <div
      ref={skillsRef}
      className='container mx-auto xl:ml-auto xl:mx-0 -ml-5 lg:max-w-sm lg:-mt-50 grid grid-cols-5 my-8 place-items-center'>
      {skills.map((el) => {
        return (
          <div key={el.alt} className='w-20 md:w-32 flex flex-col items-center rounded-lg p-2'>
            <div className='relative h-12 w-12 lg:h-16 lg:w-16'>
              <Image layout='fill' objectFit='cover' className='img' src={el.image} alt={el.alt} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Skills

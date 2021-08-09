import React from "react"
// ASSETS
import skills from "../utils/skillsData"
import Image from "next/image"

const Skills = () => {
  return (
    <div className='container md:px-32 flex flex-wrap lg:grid-cols-9 mt-12 gap-2 justify-center items-center'>
      {skills.map((el) => (
        <div className='w-24 md:w-32 flex flex-col items-center rounded-lg p-5'>
          <div key={el.title} className='relative h-12 w-12'>
            <Image
              layout='fill'
              objectFit='cover'
              className='img'
              src={el.image}
              alt={el.alt}
            />
          </div>
          <p className='font-semibold text-gray-100 mt-2'>{el.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Skills

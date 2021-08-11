import React from "react"
import ProjectCard from "./ProjectCard"

const Projects = ({ data }) => {
  data.sort((el1, el2) => (el1.id == el2.id ? 0 : el1.id > el2.id ? 1 : -1))

  return (
    <div id='projects' className='container px-5 mx-auto'>
      <h1 className='py-2 text-5xl bg-gray-200 text-black mb-12 '>projects</h1>
      <div>
        <div className='flex flex-col mx-auto place-items-start'>
          {data.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects

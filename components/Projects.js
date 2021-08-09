import React from "react"
import ProjectCard from "./ProjectCard"

const Projects = ({ data }) => {
  return (
    <div className='container lg:px-24' id='projects'>
      <h1 className='text-5xl'>Projects</h1>
      <div>
        <div className='flex flex-col mx-auto place-items-center'>
          {data.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects

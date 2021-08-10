import React from "react"
import ProjectCard from "./ProjectCard"

const Projects = ({ data }) => {
  return (
    <div id='projects' className='container mx-auto'>
      <h1 className='text-5xl text-white border-b'>Projects</h1>
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

import ProjectCard from "./ProjectCard"
import {SectionTitle} from "./SectionTitle"

const Projects = ({ data }) => {
  data.sort((el1, el2) => (el1.id == el2.id ? 0 : el1.id > el2.id ? 1 : -1))

  return (
    <div id='projects' className='container px-5  mx-auto'>
      <SectionTitle name='projects' />
      <div className='flex flex-col mt-12 mx-auto px-0 xl:px-48 place-items-start'>
        {data.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects

import ProjectCard from './ProjectCard'
import { SectionTitle } from '../SectionTitle'

const Projects = ({ data }) => {
  return (
    <main id='projects' className='-mt-10'>
      <SectionTitle name='projects' />
      <div className='container flex flex-col mt-12 mx-auto px-3 xl:px-48 place-items-start'>
        {data
          .sort((el1, el2) => (el1.id == el2.id ? 0 : el1.id > el2.id ? 1 : -1))
          .map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
      </div>
    </main>
  )
}

export default Projects

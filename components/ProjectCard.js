import gsap from "gsap"
import Image from "next/image"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const ProjectCard = ({ project }) => {
  const { projectImage, title, projectDescription, githubLink, demoLink } = project
  const imageURL = `https:${projectImage.fields.file.url}`

  return (
    <div
      className='project w-full container mt-5 flex flex-col border 
    lg:flex-row-reverse odd:lg:flex-row even:border-l-1 odd:border-r-1'>
      <div className='relative min-h-2/4 w-full'>
        <Image layout='fill' objectFit='cover' objectPosition="right" src={imageURL} />
      </div>
      <div className='container font-oswald flex'>
        <div className='p-12 2xl:px-18 flex flex-col '>
          <h1 className='text-4xl text-white font-semibold'>{title}</h1>
          <p className='text-gray-400 mt-8 text-xl'>{projectDescription}</p>
        </div>
        <div className='flex'>
          <a className='cto-button'>Github</a>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard

import gsap from "gsap"
import Image from "next/image"
import GithubIcon from "../assets/github.svg"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { PlayIcon } from "@heroicons/react/solid"
import { CodeIcon } from "@heroicons/react/solid"
gsap.registerPlugin(ScrollTrigger)
const ProjectCard = ({ project }) => {
  const { projectImage, title, projectDescription, githubLink, demoLink, techStack } =
    project
  const imageURL = `https:${projectImage.fields.file.url}`
  return (
    <div className='project'>
      <div className='project-img relative w-full min-h-60 lg:h-max'>
        <a href={demoLink} target='_blank' rel='noreferrer'>
          <Image
            layout='fill'
            objectFit='cover'
            className='transition duration-300 filter saturate-100 hover:saturate-50'
            objectPosition='top'
            src={imageURL}
          />
        </a>
      </div>
      <div className='container font-oswald flex'>
        <div className='p-5 2xl:px-18 flex flex-col '>
          <h1 className='text-teal-100 text-4xl  font-normal'>{title}</h1>
          <div className='pr-12 text-gray-500 flex flex-wrap justify-start py-5'>
            {techStack?.map((el) => (
              <span
                key={el}
                className='text-lg text-gray-100 bg-customgray px-2 mr-4 mt-2'>
                {el}
              </span>
            ))}
          </div>
          <p className='text-gray-400 mt-8 text-xl'>{projectDescription}</p>
          <div className='flex place-items-center mt-10'>
            <a
              href={demoLink}
              target='_blank'
              rel='noreferrer'
              className='cto-link flex bg-white text-black font-normal px-2 py-1 mr-5 border hover:text-white hover:bg-transparent'>
              DEMO
              <PlayIcon className='h-5 ml-1 md:h-7 md:ml-3' />
            </a>
            <a
              href={githubLink}
              target='_blank'
              rel='noreferrer'
              className='cto-link flex px-2 py-1 font-normal border hover:bg-white  hover:text-black'>
              CODE
              <CodeIcon className='h-5 ml-1 md:h-7 md:ml-3' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard

'use client';

import { useRef } from 'react';
import { PlayIcon, CodeIcon } from '@heroicons/react/solid';
import Badge from '../Badge';

const ProjectCard = ({ project }) => {
  const ref = useRef();

  const { projectImage, title, projectDescription, githubLink, demoLink, techStack } =
    project;
  const imageURL = `https:${projectImage.fields.file.url}`; //contentful formats the url without the protocol
  return (
    <div
      ref={ref}
      id={`project_${projectImage.sys.id}`}
      className='project min-h-[25rem] group'>
      <div className='project-img relative w-full h-auto group-even:border-l group-odd:border-r border-customgray focus-within:ring ring-white'>
        <a href={demoLink} target='_blank' rel='noreferrer'>
          <img
            className='transition flex h-full w-full object-cover duration-300 filter saturate-100 hover:saturate-200 '
            src={imageURL}
          />
        </a>
      </div>
      <div className='container font-oswald flex'>
        <div className='p-5 2xl:px-18 flex flex-col '>
          <h2 className='text-4xl font-normal'>{title}</h2>
          <ul className='pr-12 flex flex-wrap gap-4 justify-start py-5'>
            {techStack?.map((el) => (
              <li key={el}>
                <Badge text={el} />
              </li>
            ))}
          </ul>
          <p className='text-gray-300 mt-8 text-xl flex-grow'>{projectDescription}</p>
          <div className='flex place-items-center mt-10'>
            <a
              href={demoLink}
              target='_blank'
              rel='noreferrer'
              className='cta-link flex bg-white text-black font-normal px-2 py-1 mr-5 border hover:text-white hover:bg-transparent'>
              DEMO
              <PlayIcon className='h-5 ml-1 md:h-7 md:ml-3' />
            </a>
            <a
              href={githubLink}
              target='_blank'
              rel='noreferrer'
              className='cta-link flex px-2 py-1 font-normal border hover:bg-white  hover:text-black'>
              CODE
              <CodeIcon className='h-5 ml-1 md:h-7 md:ml-3' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;

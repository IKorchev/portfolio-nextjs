import images from '../utils/images'
import Image from 'next/image'

const LandingSection = ({ data }) => {
  return (
    <div className='p-5 py-16 lg:pt-32 lg:pb-56 md:px-12 xl:px-48 flex flex-col lg:gap-12 justify-center items-center lg:flex-row lg:justify-between'>
      <div>
        <h1 className='text-customyellow my-auto text-center lg:text-left'>Ivaylo Korchev</h1>
        <h2 className='text-white mt-5 text-center lg:text-left'>Front-end Developer</h2>
        <div className='flex flex-col mt-24'>
          <h3 className='text-2xl uppercase text-[#ccc] text-center lg:text-left'>My Skills</h3>
          <div className='flex gap-5 mt-5'>
            {images.map((img) => (
              <Image key={img} src={`/${img}.svg`} width={50} height={50} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col mt-12 lg:mt-0 max-w-md'>
          <h3 className='text-2xl uppercase text-[#ccc] text-center'>My Projects</h3>
          <div className='flex flex-wrap justify-center h-max mt-5 gap-5 '>
            {data
              .sort((el1, el2) => (el1.id == el2.id ? 0 : el1.id > el2.id ? 1 : -1))
              .map((project) => (
                <a
                  key={project.projectImage.sys.id}
                  className='h-24 w-32 relative border border-customyellow hover:border-customyellow/60'
                  href={`#project_${project.projectImage.sys.id}`}>
                  <Image className='bg-black flex' src={`https:${project.projectImage.fields.file.url}`} layout='fill' />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingSection

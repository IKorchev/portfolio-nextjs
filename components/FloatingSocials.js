import { GitHub, LinkedIn } from "@material-ui/icons"

const FloatingSocials = () => {
  return (
    <div className='bg-white fixed rounded-full p-2 bottom-4 right-6 flex flex-col z-50'>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://github.com/ikorchev/'
        className='transition duration-500 hover:opacity-60'>
        <GitHub fontSize='large' className='w-24 h-24 ' />
      </a>
      <a
        target='_blank'
        rel='noreferrer'
        href='https://www.linkedin.com/in/ivaylo-korchev/'
        className='transition duration-500 hover:opacity-60'>
        <LinkedIn fontSize='large' className='w-24 h-24 mt-3 hover:opacity-60' />
      </a>
    </div>
  )
}

export default FloatingSocials

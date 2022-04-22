import Link from "next/link"
import Linkedin from "@material-ui/icons/LinkedIn"
import Github from "@material-ui/icons/GitHub"
import Email from "@material-ui/icons/Email"
const SocialLinks = () => {
  return (
    <div className='w-full flex py-3 flex-col mt-12 lg:mt-0 lg:px-0 mx-auto'>
      <h3 className='text-3xl text-center'>Connect with me</h3>
      <div className='flex justify-center gap-5 mt-8 lg:px-24'>
        <Link href='https://linkedin.com/in/ivaylo-korchev/' target='_blank' rel='noreferrer'>
          <a className=' cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Linkedin fontSize='large' />
          </a>
        </Link>
        <Link href='https://github.com/ikorchev/' target='_blank' rel='noreferrer'>
          <a className='cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Github fontSize='large' />
          </a>
        </Link>
        <Link href='mailto:korchev94@gmail.com' target='_blank' rel='noreferrer'>
          <a className='cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Email fontSize='large' />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SocialLinks

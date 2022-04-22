import Link from "next/link"
import Linkedin from "@material-ui/icons/LinkedIn"
import Github from "@material-ui/icons/GitHub"
import Email from "@material-ui/icons/Email"
const SocialLinks = () => {
  return (
    <div className='max-w-[35rem] w-full p-3 xl:px-24 mx-auto'>
      <h3 className='text-3xl text-center xl:text-left'>Connect with me</h3>
      <div className='flex justify-evenly xl:justify-start xl:flex-col  gap-5 mt-8 '>
        <Link href='https://linkedin.com/in/ivaylo-korchev/' target='_blank' rel='noreferrer'>
          <a className=' w-max pr-3 cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Linkedin fontSize='large' /> LinkedIn
          </a>
        </Link>
        <Link href='https://github.com/ikorchev/' target='_blank' rel='noreferrer'>
          <a className=' w-max pr-3 cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Github fontSize='large' className='' /> GitHub
          </a>
        </Link>
        <Link href='mailto:korchev94@gmail.com' target='_blank' rel='noreferrer'>
          <a className=' w-max pr-3 cursor-pointer hover:text-gray-400 focus:text-gray-400'>
            <Email fontSize='large' /> Send me an email
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SocialLinks

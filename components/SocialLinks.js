import Link from "next/link"
import Linkedin from "@material-ui/icons/LinkedIn"
import Github from "@material-ui/icons/GitHub"
import Email from "@material-ui/icons/Email"
const SocialLinks = () => {
  return (
    <div className='w-full mt-12 lg:mt-0 lg:px-0 mx-auto'>
      <h3 className='text-3xl text-center'>Connect with me</h3>
      <div className='flex justify-center mt-8 lg:px-24'>
        <Link
          href='https://linkedin.com/in/ivaylo-korchev/'
          target='_blank'
          rel='noreferrer'>
          <Linkedin
            fontSize='large'
            className='mr-5 cursor-pointer hover:text-trueGray-500'
          />
        </Link>
        <Link href='https://github.com/ikorchev/' target='_blank' rel='noreferrer'>
          <Github
            fontSize='large'
            className='mr-5 cursor-pointer hover:text-trueGray-500'
          />
        </Link>
        <Link href='mailto:korchev94@gmail.com' target='_blank' rel='noreferrer'>
          <Email fontSize='large' className='cursor-pointer hover:text-trueGray-500' />
        </Link>
      </div>
    </div>
  )
}

export default SocialLinks

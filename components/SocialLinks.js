import Link from "next/link"
import Linkedin from "@material-ui/icons/LinkedIn"
import Github from "@material-ui/icons/GitHub"
import Email from "@material-ui/icons/Email"
const SocialLinks = () => {
  return (
    <div className='h-96 w-full px-12 lg:px-0 md:w-2/3 lg:w-2/4 xl:w-1/3 mx-auto mt-16'>
      <h3 className='text-3xl text-center'>social links</h3>
      <div className='flex justify-around mt-12 lg:px-24'>
        <Link
          href='https://linkedin.com/in/ivaylo-korchev/'
          target='_blank'
          rel='noreferrer'>
          <Linkedin fontSize='large' className='cursor-pointer hover:text-gray-500' />
        </Link>
        <Link href='https://github.com/ikorchev/' target='_blank' rel='noreferrer'>
          <Github fontSize='large' className='cursor-pointer hover:text-gray-500' />
        </Link>
        <Link href='mailto:korchev94@gmail.com' target='_blank' rel='noreferrer'>
          <Email fontSize='large' className='cursor-pointer hover:text-gray-500' />
        </Link>
      </div>
    </div>
  )
}

export default SocialLinks

import { SectionTitle } from "../SectionTitle"
import SocialLinks from "./SocialLinks"
import Form from "./Form"
import GithubLinks from "./GithubLinks"
const Contact = () => {
  return (
    <footer id='contact'>
      <SectionTitle name='contact' />
      <div className=' container my-16 px-5  mx-auto text-white grid grid-cols-1 xl:grid-cols-2 lg:flex-row lg:justify-around'>
        <Form />
        <SocialLinks />
      </div>

      <div className='container px-36 mx-auto mt-12 pb-5 text-gray-200'>
        <p className='text-center'>
          Copyright &copy; 2021
          <a
            href='https://ikorchev.com/'
            rel='noreferrer'
            target='_blank'
            className='text-center lg:text-right ml-2'>
            IKORCHEV.COM
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Contact

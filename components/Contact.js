import Form from "./Form"
import GithubLinks from "./GithubLinks"
import { SectionTitle } from "./SectionTitle"
import SocialLinks from "./SocialLinks"
const Contact = () => {
  return (
    <footer id='contact'>
      <SectionTitle name='contact' />
      <div className=' container my-16 px-5  mx-auto text-white grid grid-cols-1 xl:grid-cols-2 lg:flex-row lg:justify-around'>
        <Form />
        <SocialLinks />
      </div>
      <GithubLinks />
      <p className='pt-12 pb-5 mx-auto text-center text-trueGray-100'>
        Copyright &copy; 2021 ikorchev.com
      </p>
    </footer>
  )
}

export default Contact

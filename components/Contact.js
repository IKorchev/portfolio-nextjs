import Form from "./Form"
import { SectionTitle } from "./SectionTitle"
import SocialLinks from "./SocialLinks"

const Contact = () => {
  return (
    <div className='container px-5 mx-auto text-white' id='contact'>
      <SectionTitle name='contact' />
      <div className='flex flex-col lg:flex-row lg:justify-around'>
        <Form />
        <SocialLinks />
      </div>
    </div>
  )
}

export default Contact

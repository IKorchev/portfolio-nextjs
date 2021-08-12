import Link from "next/link"
import Form from "./Form"
import { SectionTitle } from "./SectionTitle"
import SocialLinks from "./SocialLinks"
import links from "../utils/footerProjectLinks"
const Contact = () => {
  return (
    <footer id='contact'>
      <SectionTitle name='contact' />
      <div className='w-full container my-16 px-5  mx-auto text-white'>
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:flex-row lg:justify-around'>
          <Form />
          <div className='flex flex-col'>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className='mt:5 max-w-48 xl:mt-12'>
        <h3 className='mb-8 text-3xl text-center mt-10 text-white font-normal'>
          Github repositories
        </h3>
        <ul className='container mx-auto px-36 grid grid-cols-1 place-items-center lg:grid-cols-2'>
          {links.map(({ title, url }) => (
            <li className='text-trueGray-400 text-lg md:text-base whitespace-nowrap underline hover:text-trueGray-100'>
              <Link href={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className='pt-12 pb-5 mx-auto text-center text-trueGray-100'>
        Copyright &copy; 2021 ikorchev.com
      </p>
    </footer>
  )
}

export default Contact

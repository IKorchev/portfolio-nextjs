import { Link } from "react-scroll"
import Logo from "../assets/Logo.svg"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className='container mx-auto pt-5 lg:px-24 flex flex-col lg:flex-row lg:justify-between lg:items-center'>
      <div className='relative mx-auto lg:mx-0 w-48 h-12'>
        <Link to='/nav'>
          <Image
            objectPosition='left'
            layout='fill'
            objectFit='contain'
            src={Logo}
            alt='Ivaylo Korchev (logo)'
          />
        </Link>
      </div>
      <div className='flex justify-around'>
        <Link className='nav-link' to='home'>
          home
        </Link>
        <Link className='nav-link whitespace-nowrap' to='aboutme'>
          about me
        </Link>
        <Link className='nav-link' to='projects'>
          projects
        </Link>
        <Link className='nav-link' to='contact'>
          contact
        </Link>
      </div>
    </div>
  )
}

export default Navbar

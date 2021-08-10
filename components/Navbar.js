import { Link } from "react-scroll"
import Logo from "../assets/Logo.svg"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className='container mx-auto pt-5 lg:px-24 align-center grid grid-cols-4 md:grid-cols-7 '>
      <div className='col-span-3 hidden md:block relative h-12'>
        <Link to='navbar-collapse'>
          <Image
            objectPosition='left'
            layout='fill'
            objectFit='contain'
            src={Logo}
            alt='Ivaylo Korchev (logo)'
          />
        </Link>
      </div>
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
  )
}

export default Navbar

import Logo from "../../assets/Logo.svg"
import Image from "next/image"
import NavButton from "./NavButton"

const Navbar = () => {
  return (
    <nav className='container z-50 mx-auto pt-5 lg:px-24 flex flex-col lg:flex-row lg:justify-between lg:items-center'>
      <div className='relative mx-auto lg:mx-0 w-16 h-12'>
        <NavButton title='' to='#home'>
          <Image
            objectPosition='left'
            layout='fill'
            objectFit='contain'
            src={Logo}
            alt='Ivaylo Korchev (logo)'
          />
        </NavButton>
      </div>
      <div className='flex mt-8 lg:mt-0 justify-around z-50'>
        <NavButton title='home' to='#home' />
        <NavButton title='projects' to='#projects' duration={1} />
        <NavButton title='about' to='#about' duration={1} />
        <NavButton title='contact' to='#contact' duration={1} />
      </div>
    </nav>
  )
}

export default Navbar

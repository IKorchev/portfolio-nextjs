
import NavButton from "./NavButton"

const Navbar = () => {
  return (
    <nav className='container relative w-full flex justify-between z-50 mx-auto pt-5 lg:px-24 flex-col lg:flex-row lg:justify-between lg:items-center'>
      <div className=' lg:block mx-auto lg:mx-0'>
        {/* <NavButton title='' to='#home'>
          <Image objectPosition='left' width={200} height={50} src='/Logo.svg' alt='Ivaylo Korchev (logo)' />
        </NavButton> */}
      </div>
      <div className='flex mt-2 lg:mt-0 justify-around z-50'>
        <NavButton title='home' to='#home' />
        <NavButton title='projects' to='#projects' duration={1} />
        <NavButton title='about' to='#about' duration={1} />
        <NavButton title='contact' to='#contact' duration={1} />
      </div>
    </nav>
  )
}

export default Navbar

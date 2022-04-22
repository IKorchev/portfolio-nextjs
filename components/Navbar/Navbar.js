import NavButton from "./NavButton"

const Navbar = () => {
  return (
    <nav role='navigation' className='container mx-auto z-50 pt-5 '>
      <div className='max-w-2xl  mx-auto flex mt-2 lg:mt-0 justify-around z-50'>
        <NavButton title='home' to='#home' />
        <NavButton title='projects' to='#projects' duration={1} />
        <NavButton title='about' to='#about' duration={1} />
        <NavButton title='contact' to='#contact' duration={1} />
      </div>
    </nav>
  )
}

export default Navbar

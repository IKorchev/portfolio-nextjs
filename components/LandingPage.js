import { useRef, useEffect } from "react"
import { Link } from "react-scroll"
import gsap from "gsap"
import { ChevronDoubleDownIcon } from "@heroicons/react/solid"
import Skills from "./Skills"
import BackgroundObjects from "./BackgroundObjects"
const LandingPage = () => {
  const parentRef = useRef()
  const skillsRef = useRef()
  useEffect(() => {
    const tl = gsap.timeline()
    // tl.from(parentRef.current.children, {
    //   opacity: 0,
    //   x: -250,
    //   duration: 2,
    //   stagger: 0.1,
    //   ease: "power4.inOut",
    // })
    //   .from(skillsRef.current.children, {
    //     opacity: 0,
    //     y: 20,
    //     duration: 0.5,
    //     stagger: 0.2,
    //   })
    //   .to("#scroll-down-button", {
    //     opacity: 1,
    //   })
  }, [])

  return (
    <div className='h-screen lg:px-24 py-12 container'>
      <div className='flex flex-col justify-between mt-12 pl-10 lg:pl-0 '>
        <BackgroundObjects className="z-0" />
        <div ref={parentRef} className="lg:mt-12 z-20">
          <h1 className='text-white text-3xl lg:text-7xl font-hahmlet tracking-giant'>
            <span className='text-5xl lg:text-8xl'>I</span>VAYLO
          </h1>
          <h1 className='text-white text-4xl lg:text-7xl font-hahmlet tracking-giant'>
            <span className='text-5xl lg:text-8xl'>K</span>ORCHEV
          </h1>
          <h2 className='text-gray-200 text-2xl lg:text-5xl font-semibold tracking-widest mt-5 max-w-sm lg:max-w-full md:mb-16'>
            FRONT END DEVELOPER
          </h2>
          <div className='flex my-12 md:mb-16 md:justify-start '>
            <a
              className='cto-link text-black border bg-white mr-5 hover:bg-black hover:border-white hover:text-white'
              target='_blank'
              rel='noreferrer'
              href='https://linkedin.com/in/ivaylo-korchev'>
              Contact me
            </a>
            <button href='' className='cto-link text-white underline hover:opacity-90'>
              <Link to='projects'>My work</Link>
            </button>
          </div>
        </div>
        <Skills skillsRef={skillsRef} />
      </div>
      <div className='overflow-x-hidden mt-12'>
        <Link
          id='scroll-down-button'
          className='flex opacity-0 flex-col animate-bounce justify-center font-semibold  hover:opacity-80'
          to='projects'>
          <ChevronDoubleDownIcon className='h-10' fill='#fff' />
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

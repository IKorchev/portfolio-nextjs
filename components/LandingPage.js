import { useRef, useEffect } from "react"
import { ChevronDoubleDownIcon } from "@heroicons/react/solid"
import Skills from "./Skills"
import BackgroundObjects from "./BackgroundObjects"
import { handleScrollDown, landingPageAnimation } from "../utils/animations"

const LandingPage = () => {
  const parentRef = useRef()
  const skillsRef = useRef()
  const scrollDownBtnRef = useRef()
  useEffect(() => {
    const childEls = parentRef.current.children
    const skills = skillsRef.current.children
    const buttonRef = scrollDownBtnRef.current
    landingPageAnimation(childEls, skills, buttonRef)
  }, [])

  return (
    <header className='lg:px-24 py-12 container mx-auto min-h-screen'>
      <div className='container flex flex-col justify-between mt-12 pl-10 lg:pl-0 '>
        <BackgroundObjects className='z-0' />
        <div ref={parentRef} className='lg:mt-12 z-20'>
          <div className='inline-flex '>
            <h1 className='text-white text-3xl lg:text-7xl font-hahmlet tracking-giant'>
              <span className='text-5xl lg:text-8xl'>I</span>VAYLO
            </h1>
          </div>
          <h1 className='text-white text-4xl lg:text-7xl font-hahmlet tracking-giant'>
            <span className='text-5xl lg:text-8xl'>K</span>ORCHEV
          </h1>
          <h2 className='text-gray-500 text-2xl lg:text-5xl font-semibold tracking-widest mt-5 max-w-sm lg:max-w-full md:mb-16'>
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
            <button
              onClick={(e) => {
                e.preventDefault()
                handleScrollDown("#projects", 1)
              }}
              className='cto-link text-white underline hover:opacity-90'>
              View my work
            </button>
          </div>
        </div>
        <Skills skillsRef={skillsRef} />
      </div>
      <div className='overflow-x-hidden mt-5 flex flex-col justify-center items-center'>
        <button
          ref={scrollDownBtnRef}
          onClick={(e) => {
            e.preventDefault()
            handleScrollDown("#projects", 1)
          }}
          id='scroll-down-button'
          className='animate-bounce justify-center font-semibold opacity-0 hover:opacity-80'>
          <ChevronDoubleDownIcon className='h-10' fill='#fff' />
        </button>
      </div>
    </header>
  )
}

export default LandingPage

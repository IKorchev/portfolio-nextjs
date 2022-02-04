import { useRef, useEffect } from "react"
import { ChevronDoubleDownIcon } from "@heroicons/react/solid"
import Skills from "./Skills"
import { handleScrollDown, landingPageAnimation } from "../utils/animations"

const LandingPage = () => {
  const parentRef = useRef()
  const skillsRef = useRef()
  const scrollDownBtnRef = useRef()

  useEffect(() => {
    const childEls = parentRef.current.children
    const buttonRef = scrollDownBtnRef.current
    landingPageAnimation(childEls, buttonRef)
  }, [])

  return (
    <header className='lg:px-24 py-24 container mx-auto min-h-screen overflow-x-hidden'>
      <div className='container flex flex-col justify-between mt-12 w-1/2 lg:pl-0 '>
        <div ref={parentRef} className='lg:mt-12 z-20   '>
          <div className='inline-flex '>
            <h1 className='text-white text-3xl lg:text-7xl  font-hahmlet tracking-giant'>
              <span className='text-5xl lg:text-8xl transform -translate-x-8'>I</span>VAYLO
            </h1>
          </div>
          <h1 className='text-white text-4xl lg:text-7xl font-hahmlet tracking-giant '>
            <span className='text-5xl lg:text-8xl'>K</span>ORCHEV
          </h1>
          <h2 className='inline text-gray-500  text-2xl lg:text-5xl font-semibold tracking-widest mt-12 max-w-sm lg:max-w-full md:mb-16 '>
            FRONT END DEVELOPER
          </h2>
          <div className='flex my-12 md:mb-16 md:justify-start  transform  '>
            <a
              className='cta-link text-black border bg-white mr-5 hover:bg-black hover:border-white hover:text-white '
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
              className='cta-link text-white underline hover:opacity-90'>
              SEE PROJECTS
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LandingPage

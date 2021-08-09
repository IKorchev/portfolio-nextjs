import { useRef } from "react"
import { Link } from "react-scroll"
import { ChevronDoubleDownIcon } from "@heroicons/react/solid"
import Skills from "./Skills"
const LandingPage = () => {
  const contentRef = useRef(null)

  return (
    <div className='h-screen lg:px-24 pt-24 '>
      {/* <div className='absolute h-full w-96 top-0 left-0 bg-black'></div> */}
      <div
        className='flex flex-col justify-between h-1/3 py-12 md:mb-24'
        ref={contentRef}>
        <h1 className='text-white'>
          IVAYLO<br></br> KORCHEV
        </h1>
        <h2 className='text-purple-200 font-semibold md:mb-16'>FRONT END DEVELOPER</h2>
        <div className='flex justify-center md:mb-16 md:justify-start '>
          <a
            className='cto-link text-white mr-5 bg-purple-700 hover:bg-purple-600'
            target='_blank'
            rel='noreferrer'
            href='https://linkedin.com/in/ivaylo-korchev'>
            Contact me
          </a>
          <button
            href=''
            className='cto-link  text-black border border-black hover:text-gray-500'>
            <Link to='projects'>My work</Link>
          </button>
        </div>
      </div>
      <div className='overflow-x-hidden absolute transform right-1/2 translate-x-1/2 bottom-0'>
        <Link
          className='flex flex-col animate-bounce justify-center font-semibold  hover:opacity-80'
          to='skills'>
          <ChevronDoubleDownIcon className='h-10' fill='#701A75' />
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

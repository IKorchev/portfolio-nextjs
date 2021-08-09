import { useRef } from "react"
import { Link } from "react-scroll"
import { ChevronDoubleDownIcon } from "@heroicons/react/solid"
import Skills from "./Skills"
const LandingPage = () => {
  return (
    <div className='h-screen lg:px-24 pt-24 '>
      {/* <div className='absolute h-full w-96 top-0 left-0 bg-black'></div> */}
      <div className='flex flex-col justify-between mt-12'>
        <h1 className='text-white pl-8 lg:pl-0 text-7xl font-hahmlet tracking-widest'>
          <span className='text-8xl'>I</span>VAYLO<br></br>{" "}
          <span className='text-8xl'>K</span>ORCHEV
        </h1>
        <h2 className='text-gray-200 pl-8 lg:pl-0 font-semibold tracking-giant mt-5 md:mb-16'>
          FRONT END DEVELOPER
        </h2>
        <div className='flex pl-8 lg:pl-0 mt-16 md:mb-16 md:justify-start '>
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
      <div className='overflow-x-hidden absolute transform right-1/2 translate-x-1/2 bottom-5'>
        <Link
          className='flex flex-col animate-bounce justify-center font-semibold  hover:opacity-80'
          to='skills'>
          <ChevronDoubleDownIcon className='h-10' fill='#fff' />
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useRef } from "react"
import { useEffect } from "react"
gsap.registerPlugin(ScrollTrigger)

export const SectionTitle = ({ name }) => {
  const titleRef = useRef()
  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom",
      },
    })
  })
  return (
    <div className='flex flex-col py-12'>
      <h1 className='z-10 text-center mx-auto px-3 rounded-sm text-5xl py-2 bg-white tracking-giant'>
        <span className='text-center -mr-2 whitespace-nowrap' ref={titleRef}>
          {name}
        </span>
      </h1>
      <div className='bg-white h-1 w-full -mt-8 z-0' />
    </div>
  )
}

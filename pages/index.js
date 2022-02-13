import { fetchContentfulData } from "../utils/contentfulProjects"
import Meta from "../components/Meta"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Suspense, useRef } from "react"
import Scene from "../components/Landing/CanvasScene/Scene"
import LandingPage from "../components/Landing/LandingPage"
import Projects from "../components/Projects/Projects"
import Contact from "../components/Footer/Contact"
import FloatingSocials from "../components/FloatingSocials"
import Aboutme from "../components/About/Aboutme"
import useScroll from "../utils/useScroll"
export default function Home({ data }) {
  const overlay = useRef()
  const scroll = useScroll()
  console.log(scroll.current)
  return (
    <>
      <Meta />
      <div className='z-0 bg-black absolute top-0 left-0 h-screen w-screen mr-5 overflow-x-hidden'>
        <Suspense>
          <Canvas
            camera={{
              fov: 50,
            }}>
            <Scene scroll={scroll} />
          </Canvas>
        </Suspense>
        <Loader />
      </div>
      <div className='bg-black' ref={overlay}>
        <LandingPage />
        <Projects data={data} />
        <Aboutme />
        <Contact />
        <FloatingSocials />
      </div>
    </>
  )
}

export const getStaticProps = async (context) => {
  const data = await fetchContentfulData()
  !data && { notFound: true }

  return {
    props: { data },
    revalidate: 10,
  }
}

import { fetchContentfulData } from "../utils/contentfulProjects"
import Meta from "../components/Meta"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Suspense, useRef } from "react"
import Scene from "../components/Landing/CanvasScene/Scene"
import Projects from "../components/Projects/Projects"
import Contact from "../components/Footer/Contact"
import FloatingSocials from "../components/FloatingSocials"
import Aboutme from "../components/About/Aboutme"
import useScroll from "../utils/useScroll"
import Navbar from "../components/Navbar/Navbar"
import GithubLinks from "../components/Footer/GithubLinks"
export default function Home({ data }) {
  const overlay = useRef()
  const scroll = useScroll()
  return (
    <>
      <Meta />
      <header className='w-screen z-50'>
        <Navbar />
      </header>
      <div className='z-0 bg-black absolute top-0 left-0 h-screen w-screen mr-5 overflow-x-hidden'>
        <Canvas
          gl={{
            precision: "highp",
          }}
          camera={{
            fov: 60,
          }}>
          <Suspense fallback={null}>
            <Scene data={data} scroll={scroll} />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
      <div className='bg-[#181a1e]' ref={overlay}>
        <div className='h-screen w-screen' />
        <Projects data={data} />
        <Aboutme />
        <GithubLinks />
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

import { fetchContentfulData } from '../utils/contentfulProjects'
import Meta from '../components/Meta'
// import { Canvas } from '@react-three/fiber'
// import { Loader } from '@react-three/drei'
// import { Suspense, useRef } from 'react'
// import Scene from '../components/Landing/CanvasScene/Scene'
import Projects from '../components/Projects/Projects'
import Contact from '../components/Footer/Contact'
import FloatingSocials from '../components/FloatingSocials'
import Aboutme from '../components/About/Aboutme'
import Navbar from '../components/Navbar/Navbar'
import GithubLinks from '../components/Footer/GithubLinks'

import LandingSection from '../components/Landing/LandingSection'
export default function Home({ data }) {
  return (
    <>
      <Meta />
      {/* <Suspense>{typeof window !== 'undefined' && <Loader />}</Suspense>
        <Canvas gl={{ precision: 'highp' }} camera={{ fov: 55 }}>
        <Suspense fallback={null}>
        <Scene data={data} scroll={scroll} />
        </Suspense>
      </Canvas> */}
      <div className='bg-customdarkgray main-content'>
        <div style={{ backgroundImage: 'url("/bg.svg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <Navbar />
          <LandingSection data={data} />
        </div>
        <Projects data={data} />
        <Aboutme />
        <GithubLinks />
        <Contact />
        <FloatingSocials />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await fetchContentfulData()

  return {
    props: { data },
    revalidate: 10,
  }
}

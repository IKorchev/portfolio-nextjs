import Head from "next/head"
import LandingPage from "../components/LandingPage"
import Navbar from "../components/Navbar"
import Projects from "../components/Projects"
import Aboutme from "../components/Aboutme"
import Contact from "../components/Contact"

import { fetchContentfulData } from "../utils/contentfulProjects"
import Meta from "../components/Meta"
export default function Home({ data }) {
  return (
    <div className='bg-black'>
      <Meta />
      <Navbar />
      <header>
        <LandingPage />
      </header>
      <main>
        <Projects data={data} />
        <Aboutme />
      </main>
      <footer>
        <Contact />
      </footer>
    </div>
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

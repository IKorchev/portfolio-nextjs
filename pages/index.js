import Head from "next/head"
import LandingPage from "../components/LandingPage"
import Skills from "../components/Skills"
import Navbar from "../components/Navbar"
import Projects from "../components/Projects"
import { fetchContentfulData } from "../utils/contentfulProjects"
export default function Home({ data }) {
  return (
    <div className='bg-black overflow-x-hidden'>
      <Head>
        <title>Ivaylo Korchev | Portfolio </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className='lg:px-24'>
        <Navbar />
      </nav>
      <header className='container mx-auto '>
        <LandingPage />
      </header>
      <main className='container mx-auto'>
        <Skills />
        <Projects data={data} />
      </main>
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

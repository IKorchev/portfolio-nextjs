import Head from "next/head"
import LandingPage from "../components/LandingPage"
import Navbar from "../components/Navbar"
import Projects from "../components/Projects"
import Aboutme from "../components/Aboutme"
import Contact from "../components/Contact"
import { fetchContentfulData } from "../utils/contentfulProjects"
export default function Home({ data }) {
  return (
    <div className='bg-black'>
      <Head>
        <title>Ivaylo Korchev | Portfolio </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className='lg:px-24'>
        <Navbar />
      </nav>
      <header className='container mx-auto'>
        <LandingPage />
      </header>
      <main className='container mx-auto'>
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

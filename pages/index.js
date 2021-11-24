import LandingPage from "../components/LandingPage"
import Navbar from "../components/Navbar"
import Projects from "../components/Projects"
import Aboutme from "../components/Aboutme"
import Contact from "../components/Contact"
import { fetchContentfulData } from "../utils/contentfulProjects"
import Meta from "../components/Meta"
import FloatingSocials from "../components/FloatingSocials"

export default function Home({ data }) {
  return (
    <div className='bg-black'>
      <FloatingSocials />
      <Meta />
      <Navbar />
      <LandingPage />
      <Projects data={data} />
      <Aboutme />
      <Contact />
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

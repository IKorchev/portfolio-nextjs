import { fetchContentfulData } from '../utils/contentfulProjects';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Footer/Contact';
import FloatingSocials from '../components/FloatingSocials';
import Aboutme from '../components/About/Aboutme';
import Navbar from '../components/Navbar/Navbar';
import GithubLinks from '../components/Footer/GithubLinks';
import LandingSection from '../components/LandingSection';
import GTM from '../components/GTM';

export default async function Page() {
  const data = await fetchContentfulData();
  return (
    <div className='bg-customdarkgray main-content'>
      <GTM />
      <div
        style={{
          backgroundImage: 'url("/bg.svg")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <Navbar />
        <LandingSection data={data} />
      </div>
      <FloatingSocials />
      <Projects data={data} />
      <Aboutme />
      <GithubLinks />
      <Contact />
    </div>
  );
}

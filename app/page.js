import contentfulClient from '../utils/contentfulClient';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Footer/Contact';
import Aboutme from '../components/About/Aboutme';
import Navbar from '../components/Navbar/Navbar';
import GithubLinks from '../components/GithubLinks';
import LandingSection from '../components/LandingSection';
import GTM from '../components/GTM';

async function getContentfulData() {
    try {
        const data = await contentfulClient.getEntries(process.env.CONTENTFUL_API_KEY);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export default async function Page() {
    const contentfulData = await getContentfulData();
    const description = contentfulData.items?.find((item) => item.sys.contentType.sys.id === 'richText');
    const projects =
        contentfulData?.items?.filter((item) => item.sys.contentType.sys.id === 'portfolio').map((p) => p.fields) || [];
    return (
        <div className='bg-customdarkgray main-content'>
            <GTM />
            <div className='bg-[url(/bg.svg)] bg-no-repeat bg-center bg-cover'>
                <Navbar />
                <LandingSection projects={projects} />
            </div>
            <Projects projects={projects} />
            <Aboutme data={description} />
            <GithubLinks />
            <Contact />
        </div>
    );
}

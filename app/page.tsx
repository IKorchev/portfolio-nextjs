import contentfulClient, { type AboutEntry, type Project } from '@/utils/contentfulClient';
import Projects from '@/components/Projects/Projects';
import ArchivedProjects from '@/components/Projects/ArchivedProjects';
import Contact from '@/components/Footer/Contact';
import Aboutme from '@/components/About/Aboutme';
import Navbar from '@/components/Navbar/Navbar';
import LandingSection from '@/components/LandingSection';
import GTM from '@/components/GTM';
import Experience from '@/components/Experience';

// Re-render hourly so Contentful edits and the "Present" durations stay current without a redeploy
export const revalidate = 3600;

async function getContentfulData() {
    try {
        return (await contentfulClient.getEntries()).items;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export default async function Page() {
    const items = await getContentfulData();
    const description = items.find((item) => item.sys.contentType.sys.id === 'richText') as AboutEntry | undefined;
    const projects = items
        .filter((item) => item.sys.contentType.sys.id === 'portfolio')
        .map((p) => p.fields as unknown as Project);
    return (
        <>
            <GTM />
            <Navbar />
            <main>
                <LandingSection />
                <Experience />
                <Projects projects={projects.filter((p) => !p.archived)} />
                <ArchivedProjects projects={projects.filter((p) => p.archived)} />
                <Aboutme data={description} />
            </main>
            <Contact />
        </>
    );
}

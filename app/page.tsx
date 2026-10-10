import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import Projects from '@/components/Projects/Projects';
import ArchivedProjects from '@/components/Projects/ArchivedProjects';
import Contact from '@/components/Footer/Contact';
import Aboutme from '@/components/About/Aboutme';
import Navbar from '@/components/Navbar/Navbar';
import LandingSection from '@/components/LandingSection';
import GTM from '@/components/GTM';
import { EasterEggs } from '@/components/easter-eggs';
import { PrintCV } from '@/components/print-cv';
import Experience from '@/components/Experience';

// Re-render hourly so the "Present" durations stay current. Contentful publishes also
// revalidate straight away through the webhook in app/api/revalidate.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const { profile } = await getContent();
    const title = profile.seoTitle ?? profile.name;
    const description = profile.seoDescription;
    return {
        title,
        description,
        keywords: profile.seoKeywords,
        openGraph: {
            title,
            description: profile.socialDescription ?? description,
            url: 'https://ikorchev.com/',
            images: profile.socialImageUrl ? [profile.socialImageUrl] : undefined,
        },
    };
}

export default async function Page() {
    const { profile, roles, skills, projects, about } = await getContent();
    return (
        <>
            <GTM />
            {/* On paper the site is swapped for a plain CV */}
            <div className='print:hidden'>
                <EasterEggs githubUrl={profile.githubUrl} />
                <Navbar profile={profile} />
                <main>
                    <LandingSection profile={profile} roles={roles} skills={skills} />
                    <Experience roles={roles} company={profile.company} />
                    <Projects projects={projects.filter((p) => !p.archived)} />
                    <ArchivedProjects projects={projects.filter((p) => p.archived)} />
                    <Aboutme data={about} profile={profile} roles={roles} />
                </main>
                <Contact profile={profile} />
            </div>
            <PrintCV profile={profile} roles={roles} skills={skills} projects={projects} />
        </>
    );
}

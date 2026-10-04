import { SectionHeading } from '@/components/SectionHeading';
import type { Project } from '@/utils/contentfulClient';
import ProjectCard from './ProjectCard';

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <section id='projects' className='mx-auto max-w-6xl px-4 py-24 sm:px-6'>
            <SectionHeading eyebrow='Selected work' title='Projects'>
                A few things I&apos;ve designed and built.
            </SectionHeading>
            <div className='grid gap-6 md:grid-cols-2'>
                {projects
                    .sort((el1, el2) => (el1.id == el2.id ? 0 : (el1.id ?? 0) > (el2.id ?? 0) ? 1 : -1))
                    .map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
            </div>
        </section>
    );
};

export default Projects;

import { Code, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/utils/contentfulClient';

const linkClass =
    'inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand';

/** Older projects as compact, image-free cards, newest first */
const ArchivedProjects = ({ projects }: { projects: Project[] }) => {
    if (!projects.length) return null;
    const sorted = [...projects].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
    return (
        <section id='archive' className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16'>
            <Reveal>
                <SectionHeading eyebrow='Archive' title='Earlier work'>
                    Projects I built to learn new technologies by shipping something real with them.
                </SectionHeading>
            </Reveal>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {sorted.map((project, i) => (
                    <Reveal key={project.title} delay={(i % 3) * 0.05} className='h-full'>
                        <Card
                            data-spotlight
                            className='h-full gap-3 px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/50'>
                            <div className='flex items-baseline justify-between gap-3'>
                                <h3 className='font-semibold tracking-tight'>{project.title}</h3>
                                {project.date && (
                                    <time
                                        dateTime={project.date}
                                        className='shrink-0 font-mono text-xs text-muted-foreground'>
                                        {project.date.slice(0, 4)}
                                    </time>
                                )}
                            </div>
                            {project.projectDescription && (
                                <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
                                    {project.projectDescription}
                                </p>
                            )}
                            {!!project.techStack?.length && (
                                <ul className='mt-auto flex flex-wrap gap-1.5 pt-1'>
                                    {project.techStack.map((tech) => (
                                        <li key={tech}>
                                            <Badge variant='secondary' className='font-normal'>
                                                {tech.trim()}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {(project.demoLink || project.githubLink) && (
                                <div className='flex gap-5 border-t pt-3'>
                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target='_blank'
                                            rel='noreferrer'
                                            aria-label={`${project.title} live demo`}
                                            className={linkClass}>
                                            <ExternalLink className='size-3.5' /> Live demo
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target='_blank'
                                            rel='noreferrer'
                                            aria-label={`${project.title} source code`}
                                            className={linkClass}>
                                            <Code className='size-3.5' /> Source
                                        </a>
                                    )}
                                </div>
                            )}
                        </Card>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default ArchivedProjects;

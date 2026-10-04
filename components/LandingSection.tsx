import Image from 'next/image';
import { ArrowDown, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/utils/contentfulClient';
import skills from '@/utils/skills';

const LandingSection = ({ projects }: { projects: Project[] }) => {
    const featured = projects.filter((p) => p.projectImage?.fields?.file).slice(0, 4);
    return (
        <section id='home' className='relative overflow-hidden'>
            <div className='bg-grid pointer-events-none absolute inset-0' />
            <div className='pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
            <div className='relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-32 lg:pb-32'>
                <div>
                    <Badge variant='outline' className='gap-2 bg-card px-3 py-1 text-muted-foreground'>
                        <span className='size-1.5 rounded-full bg-primary' />
                        Front-end Developer
                    </Badge>
                    <h1 className='mt-6 text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl'>
                        Ivaylo
                        <br />
                        <span className='bg-gradient-to-r from-brand to-orange-500 bg-clip-text text-transparent'>
                            Korchev
                        </span>
                    </h1>
                    <p className='mt-6 max-w-lg text-lg text-muted-foreground'>
                        I build fast, responsive and accessible web applications with React, Next.js and modern
                        tooling.
                    </p>
                    <div className='mt-8 flex flex-wrap gap-3'>
                        <Button size='lg' asChild className='rounded-full'>
                            <a href='#projects'>
                                View projects <ArrowDown />
                            </a>
                        </Button>
                        <Button size='lg' variant='outline' asChild className='rounded-full'>
                            <a href='#contact'>
                                <Mail /> Get in touch
                            </a>
                        </Button>
                    </div>
                    <ul className='mt-12 flex flex-wrap gap-2' aria-label='Skills'>
                        {skills.map(({ name, icon: Icon, color }) => (
                            <li key={name}>
                                <Badge variant='outline' className='gap-1.5 bg-card px-3 py-1.5 text-sm'>
                                    <Icon className='size-4!' style={{ color }} />
                                    {name}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </div>
                {featured.length > 0 && (
                    <div className='grid grid-cols-2 gap-4'>
                        {featured.map((project, i) => (
                            <a
                                key={project.projectImage.sys.id}
                                href={`#project_${project.projectImage.sys.id}`}
                                aria-label={project.title}
                                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:border-primary ${
                                    i % 2 ? 'lg:translate-y-8 lg:hover:translate-y-7' : ''
                                }`}>
                                <Image
                                    src={`https:${project.projectImage.fields.file.url}`}
                                    alt={project.title || ''}
                                    fill
                                    sizes='(min-width: 1024px) 240px, 50vw'
                                    className='object-cover transition duration-500 group-hover:scale-105'
                                />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LandingSection;

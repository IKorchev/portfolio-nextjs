import { ArrowUpRight, Mail } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Profile } from '@/utils/contentfulClient';

const Contact = ({ profile }: { profile: Profile }) => {
    const links = [
        { href: profile.linkedinUrl, icon: BsLinkedin, label: 'LinkedIn' },
        { href: profile.githubUrl, icon: BsGithub, label: 'GitHub' },
    ].filter((link) => link.href);
    return (
        <footer id='contact' className='mx-auto max-w-6xl px-4 pb-10 sm:px-6'>
            <Reveal>
                <Card
                    data-spotlight
                    className='relative items-center overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12'>
                    <div className='pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
                    <div className='relative'>
                        <p className='font-mono text-xs tracking-[0.2em] text-brand uppercase'>Contact</p>
                        {profile.contactHeading && (
                            <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-5xl'>
                                {profile.contactHeading}
                            </h2>
                        )}
                        {profile.contactText && (
                            <p className='mx-auto mt-4 max-w-md text-muted-foreground'>{profile.contactText}</p>
                        )}
                        <div className='mt-8 flex flex-wrap justify-center gap-3'>
                            <Button size='lg' asChild className='rounded-full'>
                                <a href={`mailto:${profile.email}`}>
                                    <Mail /> Say hello
                                </a>
                            </Button>
                            {links.map(({ href, icon: Icon, label }) => (
                                <Button
                                    key={label}
                                    size='lg'
                                    variant='outline'
                                    asChild
                                    className='group/link rounded-full'>
                                    <a href={href} target='_blank' rel='noreferrer'>
                                        <Icon /> {label}
                                        <ArrowUpRight className='size-3 opacity-50 transition group-hover/link:opacity-100' />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>
            </Reveal>
            <Separator className='mt-10' />
            <div className='mt-6 flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row'>
                <p>
                    &copy; {new Date().getFullYear()} {profile.name}
                </p>
                <a href='https://ikorchev.com/' className='font-mono transition-colors hover:text-foreground'>
                    ikorchev.com
                </a>
            </div>
        </footer>
    );
};

export default Contact;

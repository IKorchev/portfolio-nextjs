import { ArrowUpRight, GitCommitHorizontal, Mail } from 'lucide-react';
import { LocalTime } from '@/components/local-time';
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
    // Vercel's system env vars name the deployed commit; locally they're unset and the link hides
    const { VERCEL_GIT_COMMIT_SHA: commitSha, VERCEL_GIT_REPO_OWNER: owner, VERCEL_GIT_REPO_SLUG: repo } = process.env;
    const commitUrl = commitSha && owner && repo && `https://github.com/${owner}/${repo}/commit/${commitSha}`;
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
                        <LocalTime timeZone={profile.timeZone} location={profile.location} />
                    </div>
                </Card>
            </Reveal>
            <Separator className='mt-10' />
            <div className='mt-6 flex flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-left'>
                <div>
                    <p>
                        &copy; {new Date().getFullYear()} {profile.name}
                    </p>
                    <p className='mt-1 text-xs'>Designed and built by me, with Next.js and Contentful.</p>
                </div>
                <div className='flex items-center gap-4 font-mono text-xs'>
                    {commitUrl && (
                        <a
                            href={commitUrl}
                            target='_blank'
                            rel='noreferrer'
                            title='The commit this version of the site was built from'
                            className='inline-flex items-center gap-1.5 transition-colors hover:text-foreground'>
                            <GitCommitHorizontal className='size-3.5' />
                            {commitSha!.slice(0, 7)}
                        </a>
                    )}
                    <a href='https://ikorchev.com/' className='transition-colors hover:text-foreground'>
                        ikorchev.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Contact;

import { ArrowUpRight, Mail } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const links = [
    {
        href: 'https://linkedin.com/in/ivaylo-korchev/',
        icon: BsLinkedin,
        label: 'LinkedIn',
    },
    {
        href: 'https://github.com/ikorchev/',
        icon: BsGithub,
        label: 'GitHub',
    },
];

const Contact = () => {
    return (
        <footer id='contact' className='mx-auto max-w-6xl px-4 pb-10 sm:px-6'>
            <Reveal>
                <Card
                    data-spotlight
                    className='relative items-center overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12'>
                    <div className='pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
                    <div className='relative'>
                        <p className='font-mono text-xs tracking-[0.2em] text-brand uppercase'>Contact</p>
                        <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-5xl'>
                            Let&apos;s build something together.
                        </h2>
                        <p className='mx-auto mt-4 max-w-md text-muted-foreground'>
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </p>
                        <div className='mt-8 flex flex-wrap justify-center gap-3'>
                            <Button size='lg' asChild className='rounded-full'>
                                <a href='mailto:korchev94@gmail.com'>
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
                <p>&copy; {new Date().getFullYear()} Ivaylo Korchev</p>
                <a href='https://ikorchev.com/' className='font-mono transition-colors hover:text-foreground'>
                    ikorchev.com
                </a>
            </div>
        </footer>
    );
};

export default Contact;

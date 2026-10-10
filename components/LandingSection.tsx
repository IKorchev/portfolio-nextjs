import { ArrowDown, Mail } from 'lucide-react';
import { HeroBackground } from '@/components/hero-background';
import { HeroCodeCard } from '@/components/hero-code-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import skills from '@/utils/skills';

const LandingSection = () => {
    return (
        <section id='home' className='relative overflow-hidden'>
            <HeroBackground />
            <div className='bg-grid pointer-events-none absolute inset-0' />
            <div className='relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-20 pb-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-32 lg:pb-20'>
                <div>
                    <Badge variant='outline' className='gap-2 bg-card px-3 py-1 text-muted-foreground'>
                        <span className='size-1.5 rounded-full bg-primary' />
                        Software Engineer
                    </Badge>
                    <h1 className='mt-6 text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl'>
                        Ivaylo
                        <br />
                        <span className='bg-gradient-to-r from-brand to-sky-500 bg-clip-text text-transparent'>
                            Korchev
                        </span>
                    </h1>
                    <p className='mt-6 max-w-lg text-lg text-muted-foreground'>
                        Building web and mobile apps with React, React Native and a growing focus on AI.
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
                <HeroCodeCard />
            </div>
        </section>
    );
};

export default LandingSection;

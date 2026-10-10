import { ArrowDown, Mail } from 'lucide-react';
import { HeroCodeCard } from '@/components/hero-code-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Profile, Role, Skill } from '@/utils/contentfulClient';
import { skillIcon } from '@/utils/skills';

const LandingSection = ({ profile, roles, skills }: { profile: Profile; roles: Role[]; skills: Skill[] }) => {
    // The last name gets its own line and the gradient
    const nameParts = profile.name.trim().split(/\s+/);
    const lastName = nameParts.pop();
    return (
        <section id='home' className='relative overflow-hidden'>
            <div className='bg-grid pointer-events-none absolute inset-0' />
            <div className='relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-20 pb-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-32 lg:pb-20'>
                <div>
                    <Badge variant='outline' className='gap-2 bg-card px-3 py-1 text-muted-foreground'>
                        <span className='size-1.5 rounded-full bg-primary' />
                        {profile.headline}
                    </Badge>
                    <h1 className='mt-6 text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl'>
                        {nameParts.length > 0 && (
                            <>
                                {nameParts.join(' ')}
                                <br />
                            </>
                        )}
                        <span className='bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent'>
                            {lastName}
                        </span>
                    </h1>
                    {profile.tagline && (
                        <p className='mt-6 max-w-lg text-lg text-muted-foreground'>{profile.tagline}</p>
                    )}
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
                    {skills.length > 0 && (
                        <ul className='mt-12 flex flex-wrap gap-2' aria-label='Skills'>
                            {skills.map(({ name, iconKey, color }) => {
                                const Icon = skillIcon(iconKey);
                                return (
                                    <li key={name}>
                                        <Badge variant='outline' className='gap-1.5 bg-card px-3 py-1.5 text-sm'>
                                            <Icon className='size-4!' style={{ color }} />
                                            {name}
                                        </Badge>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <HeroCodeCard profile={profile} roles={roles} />
            </div>
        </section>
    );
};

export default LandingSection;

import { BsGithub } from 'react-icons/bs';
import { CommandMenu } from '@/components/command-menu';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/utils/contentfulClient';
import NavButton from './NavButton';

const Navbar = ({ profile }: { profile: Profile }) => {
  return (
    <header className='sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <a href='#home' className='font-mono text-sm font-semibold tracking-tight'>
          ikorchev<span className='text-brand'>.</span>
          <span className='hidden sm:inline'>com</span>
        </a>
        <div className='flex items-center sm:gap-1'>
          <CommandMenu name={profile.name} email={profile.email} githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
          <NavButton title='Experience' to='#experience' />
          <NavButton title='Projects' to='#projects' />
          <NavButton title='About' to='#about' className='hidden sm:inline-flex' />
          <NavButton title='Contact' to='#contact' className='max-[359px]:hidden' />
          {profile.githubUrl && (
            <Button variant='ghost' size='icon' asChild className='hidden rounded-full sm:inline-flex'>
              <a href={profile.githubUrl} target='_blank' rel='noreferrer' aria-label='GitHub'>
                <BsGithub />
              </a>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

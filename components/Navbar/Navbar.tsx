import { BsGithub } from 'react-icons/bs';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import NavButton from './NavButton';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <a href='#home' className='font-mono text-sm font-semibold tracking-tight'>
          ikorchev<span className='text-brand'>.</span>com
        </a>
        <div className='flex items-center gap-0.5 sm:gap-1'>
          <NavButton title='Projects' to='#projects' />
          <NavButton title='About' to='#about' />
          <NavButton title='Contact' to='#contact' />
          <Button variant='ghost' size='icon' asChild className='hidden rounded-full sm:inline-flex'>
            <a href='https://github.com/ikorchev/' target='_blank' rel='noreferrer' aria-label='GitHub'>
              <BsGithub />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import { BsGithub } from 'react-icons/bs';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import NavButton from './NavButton';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <a href='#home' className='font-mono text-sm font-semibold tracking-tight'>
          ikorchev<span className='text-brand'>.</span>
          <span className='hidden sm:inline'>com</span>
        </a>
        <div className='flex items-center sm:gap-1'>
          <NavButton title='Experience' to='#experience' />
          <NavButton title='Projects' to='#projects' />
          <NavButton title='About' to='#about' className='hidden sm:inline-flex' />
          <NavButton title='Contact' to='#contact' className='max-[359px]:hidden' />
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

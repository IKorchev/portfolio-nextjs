import { Button } from '@/components/ui/button';

const NavButton = ({ title, to }: { title: string; to: string }) => {
  return (
    <Button variant='ghost' size='sm' asChild className='rounded-full text-muted-foreground hover:text-foreground'>
      <a href={to}>{title}</a>
    </Button>
  );
};

export default NavButton;

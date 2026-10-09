import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavButton = ({ title, to, className }: { title: string; to: string; className?: string }) => {
  return (
    <Button variant='ghost' size='sm' asChild className={cn('rounded-full px-2 text-muted-foreground hover:text-foreground sm:px-3', className)}>
      <a href={to}>{title}</a>
    </Button>
  );
};

export default NavButton;

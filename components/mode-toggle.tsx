'use client';

import { useRef } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { switchTheme } from '@/lib/theme-transition';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The reveal spreads out from the toggle button
  const onValueChange = (value: string) => {
    const rect = triggerRef.current?.getBoundingClientRect();
    switchTheme(value, setTheme, rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={triggerRef} variant='ghost' size='icon' className='rounded-full'>
          <Sun className='size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup value={theme} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value='light'>
            <Sun /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <Moon /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system'>
            <Monitor /> System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

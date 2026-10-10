'use client';

import { useRef } from 'react';
import { Contrast, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ACCENTS, type Accent } from '@/lib/accents';
import { switchAccent, switchHighContrast, switchTheme } from '@/lib/theme-transition';
import { useAccent, useHighContrast } from '@/lib/use-accent';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const accent = useAccent();
  const highContrast = useHighContrast();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Both reveals spread out from the toggle button
  const origin = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    return rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={triggerRef} variant='ghost' size='icon' className='rounded-full'>
          <Sun className='size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Theme and colour</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuLabel className='text-xs text-muted-foreground'>Mode</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => switchTheme(value, setTheme, origin())}>
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
        <DropdownMenuSeparator />
        <DropdownMenuLabel className='text-xs text-muted-foreground'>Colour</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={accent} onValueChange={(value) => switchAccent(value as Accent, origin())}>
          {ACCENTS.map(({ id, label, swatch }) => (
            <DropdownMenuRadioItem key={id} value={id}>
              <span className='size-3.5 rounded-full ring-1 ring-foreground/10' style={{ background: swatch }} />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={highContrast}
          onCheckedChange={(on) => switchHighContrast(on, origin())}>
          <Contrast /> High contrast
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

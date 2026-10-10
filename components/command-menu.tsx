'use client';

import { useEffect, useState } from 'react';
import {
  Binary,
  Briefcase,
  Coffee,
  Copy,
  FolderGit2,
  Home,
  Mail,
  Monitor,
  Moon,
  Search,
  Sun,
  Terminal,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { emojiRain, setHeroFinish, toast } from '@/lib/easter-eggs';
import { switchTheme } from '@/lib/theme-transition';

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const themes = [
  { value: 'light', label: 'Light theme', icon: Sun },
  { value: 'dark', label: 'Dark theme', icon: Moon },
  { value: 'system', label: 'System theme', icon: Monitor },
];

export function CommandMenu({
  name,
  email,
  githubUrl,
  linkedinUrl,
}: {
  name: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const { setTheme } = useTheme();

  // Hidden commands: they only show up once someone types them
  const firstName = name.split(/\s+/)[0].toLowerCase();
  const query = search.trim().toLowerCase().replace(/\s+/g, ' ');
  const secrets = [
    {
      value: `sudo hire ${firstName}`,
      icon: Terminal,
      visible: query.startsWith('sudo hire'),
      action: () => {
        toast('🔓 Permission granted');
        window.location.href = `mailto:${email}?subject=${encodeURIComponent("Let's work together")}`;
      },
    },
    {
      value: 'coffee',
      icon: Coffee,
      visible: query === 'coffee',
      action: () => {
        emojiRain('☕');
        toast('☕ Refuelling…');
      },
    },
    {
      value: 'matrix',
      icon: Binary,
      visible: query === 'matrix',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setHeroFinish('matrix', 10_000);
        toast('🟩 Follow the white rabbit');
      },
    },
  ].filter((secret) => secret.visible);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Close first so the dialog's focus restore doesn't fight the scroll or theme reveal
  const run = (action: () => void) => {
    setOpen(false);
    setTimeout(action, 150);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 800);
  };

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        onClick={() => setOpen(true)}
        className='mr-1 hidden gap-2 rounded-full pr-1.5 text-muted-foreground md:inline-flex'
      >
        <Search />
        Search
        <kbd className='rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] font-medium'>
          {isMac ? '⌘' : 'Ctrl '}K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSearch('');
        }}
        title='Command menu'
        description='Jump to a section or run an action'
      >
        <CommandInput placeholder='Type a command or search…' value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {secrets.length > 0 && (
            <CommandGroup heading='Secret'>
              {secrets.map(({ value, icon: Icon, action }) => (
                <CommandItem key={value} value={value} onSelect={() => run(action)} className='font-mono'>
                  <Icon /> {value}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading='Go to'>
            {sections.map(({ id, label, icon: Icon }) => (
              <CommandItem
                key={id}
                onSelect={() =>
                  run(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, '', `#${id}`);
                  })
                }
              >
                <Icon /> {label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Contact'>
            <CommandItem onSelect={copyEmail} keywords={['email', 'mail', 'copy']}>
              <Copy /> {copied ? 'Copied!' : 'Copy email address'}
              <CommandShortcut>{email}</CommandShortcut>
            </CommandItem>
            {githubUrl && (
              <CommandItem onSelect={() => run(() => window.open(githubUrl, '_blank'))}>
                <BsGithub /> Open GitHub
              </CommandItem>
            )}
            {linkedinUrl && (
              <CommandItem onSelect={() => run(() => window.open(linkedinUrl, '_blank'))}>
                <BsLinkedin /> Open LinkedIn
              </CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            {themes.map(({ value, label, icon: Icon }) => (
              <CommandItem key={value} onSelect={() => run(() => switchTheme(value, setTheme))}>
                <Icon /> {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

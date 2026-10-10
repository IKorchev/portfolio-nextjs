import Link from 'next/link';
import { ArrowLeft, FolderGit2 } from 'lucide-react';
import { HeroBackground } from '@/components/hero-background';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { getContent } from '@/lib/content';

export default async function NotFound() {
  // The 404 should still render if Contentful is down, just without the navbar
  const profile = await getContent()
    .then((content) => content.profile)
    .catch(() => null);

  return (
    <>
      <title>Page not found · ikorchev.com</title>
      {profile && <Navbar profile={profile} />}
      <main className='relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden'>
        <HeroBackground />
        <div className='bg-grid pointer-events-none absolute inset-0' />
        <div className='relative mx-auto max-w-xl px-4 py-24 text-center sm:px-6'>
          <p className='font-mono text-xs tracking-[0.2em] text-brand uppercase'>Error 404</p>
          <h1 className='mt-4 bg-gradient-to-r from-brand to-sky-500 bg-clip-text text-8xl font-semibold tracking-tighter text-transparent sm:text-9xl'>
            404
          </h1>
          <p className='mt-6 text-xl font-semibold tracking-tight sm:text-2xl'>This page dissolved into the metal.</p>
          <p className='mt-3 text-muted-foreground'>
            The link might be out of date, or the page never existed. Either way, there&apos;s nothing here but liquid
            chrome. Try poking it.
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-3'>
            <Button size='lg' asChild className='rounded-full'>
              <Link href='/'>
                <ArrowLeft /> Back home
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild className='rounded-full'>
              <Link href='/#projects'>
                <FolderGit2 /> See projects
              </Link>
            </Button>
          </div>
          {profile && (
            <p className='mt-8 text-sm text-muted-foreground'>
              Looking for something specific? Press{' '}
              <kbd className='rounded-md border bg-muted px-1.5 py-0.5 font-mono text-xs'>Ctrl/⌘ K</kbd> to search.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

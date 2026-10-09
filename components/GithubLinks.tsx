'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Repo = { id: number; name: string; html_url: string };

const GithubLinks = () => {
    const hasTriedToFetch = useRef(false);
    const [repos, setRepos] = useState<Repo[] | null>(null);

    const loadRepos = async (open: boolean) => {
        if (!open || hasTriedToFetch.current) return;
        hasTriedToFetch.current = true;
        try {
            const response = await fetch('/api/github', {
                method: 'GET',
            });
            const json = await response.json();
            setRepos(Array.isArray(json.data) ? json.data : []);
        } catch {
            setRepos([]);
        }
    };

    return (
        <section className='mx-auto max-w-6xl px-4 pb-24 sm:px-6'>
            <Reveal>
                <Card data-spotlight className='py-0'>
                    <Collapsible onOpenChange={loadRepos} className='group'>
                        <CollapsibleTrigger className='flex w-full cursor-pointer items-center gap-4 rounded-xl p-6 text-left'>
                            <span className='grid size-10 place-items-center rounded-lg bg-primary/10 text-brand'>
                                <BsGithub className='size-5' />
                            </span>
                            <span className='flex-1'>
                                <span className='block font-semibold'>GitHub repositories</span>
                                <span className='block text-sm text-muted-foreground'>
                                    {repos?.length
                                        ? `${repos.length} public repositories`
                                        : 'Browse everything else I have built'}
                                </span>
                            </span>
                            <ChevronDown className='size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180' />
                        </CollapsibleTrigger>
                        <CollapsibleContent className='border-t p-6'>
                            {repos === null ? (
                                <p className='text-sm text-muted-foreground'>Loading…</p>
                            ) : repos.length === 0 ? (
                                <p className='text-sm text-muted-foreground'>
                                    Couldn&apos;t load repositories right now.
                                </p>
                            ) : (
                                <ul className='flex flex-wrap gap-2'>
                                    {repos.map(({ name, html_url, id }) => (
                                        <li key={id}>
                                            <Badge variant='outline' asChild className='group/repo px-3 py-1 text-sm'>
                                                <a href={html_url} target='_blank' rel='noreferrer'>
                                                    {name}
                                                    <ArrowUpRight className='opacity-50 transition group-hover/repo:opacity-100' />
                                                </a>
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
            </Reveal>
        </section>
    );
};

export default GithubLinks;

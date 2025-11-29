'use client';

import { useRef, useState } from 'react';
import Badge from './Badge';

const GithubLinks = () => {
    const hasTriedToFetch = useRef(false);
    const [repos, setRepos] = useState([]);
    return (
        <div className='p-5'>
            <details
                onToggle={async (e) => {
                    if (e.newState === 'open' && !hasTriedToFetch.current) {
                        hasTriedToFetch.current = true;
                        const response = await fetch('/api/github', {
                            method: 'GET',
                        });
                        const json = await response.json();
                        setRepos(json.data);
                    }
                }}
                className='container max-w-7xl bg-darkgray border border-customgray mx-auto rounded-lg'>
                <summary className='text-xl py-5 px-5 cursor-pointer rounded-lg  text-white font-bold'>
                    Github Repositories
                    <span className='self-end'>{repos?.length ? ' - ' + repos.length : ''}</span>
                </summary>
                <ul className='flex gap-3 p-5 border-t border-customgray flex-wrap  mx-auto '>
                    {repos?.map(({ name, html_url, id }) => (
                        <li key={id}>
                            <Badge text={name} link={html_url} />
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
};

export default GithubLinks;

import { NextResponse } from 'next/server';

export async function GET() {
    const data = await fetch('https://api.github.com/users/ikorchev/repos', {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
        },
    })
        .then((res) => res.json())
        .catch((error) => {
            console.error('Error fetching GitHub data:', error);
            return [];
        });
    return NextResponse.json({ data });
}

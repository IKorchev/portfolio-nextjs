import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// Called by a Contentful webhook on publish/unpublish so content changes go live
// straight away instead of waiting for the hourly revalidation in app/page.tsx
export async function POST(req: Request) {
    const secret = Buffer.from(process.env.CONTENTFUL_REVALIDATE_SECRET ?? '');
    const provided = Buffer.from(req.headers.get('x-revalidate-secret') ?? '');
    if (!secret.length || provided.length !== secret.length || !timingSafeEqual(provided, secret)) {
        return NextResponse.json({ code: 'UNAUTHORIZED', message: 'Invalid revalidation secret' }, { status: 401 });
    }

    revalidatePath('/');
    return NextResponse.json({ revalidated: true, now: Date.now() });
}

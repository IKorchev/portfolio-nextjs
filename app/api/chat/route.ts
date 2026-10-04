import admin from 'firebase-admin';
import { xai } from '@ai-sdk/xai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { getApps, type App } from 'firebase-admin/app';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const FIREBASE_CONFIG = JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG as string, 'base64').toString('utf-8'));

let app: App;
const apps = getApps();
if (apps.length === 0) {
    app = admin.initializeApp({
        credential: admin.credential.cert(FIREBASE_CONFIG),
    });
} else {
    app = apps[0];
}
export async function POST(req: Request) {
    const authorization = (await headers()).get('authorization');
    const token = authorization?.split('Bearer ')[1];
    try {
        await admin.auth(app).verifyIdToken(token ?? '');
    } catch (error) {
        return NextResponse.json(
            {
                code: 'INVALID_TOKEN',
                message: 'Invalid or expired token',
            },
            {
                status: 401,
                statusText: 'Unauthorized',
            }
        );
    }
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: xai('grok-4-fast-non-reasoning'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'none',
        },
    });
}

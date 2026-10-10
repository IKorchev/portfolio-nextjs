import { Tilt } from '@/components/tilt';
import { formatDuration, monthsBetween } from '@/lib/date';
import { roles } from '@/utils/experience';

type Token = { text: string; kind?: 'keyword' | 'key' | 'string' | 'comment' | 'punct' };

const tokenClass: Record<NonNullable<Token['kind']>, string> = {
    keyword: 'text-sky-600 dark:text-sky-400',
    key: 'text-foreground',
    string: 'text-brand',
    comment: 'text-muted-foreground italic',
    punct: 'text-muted-foreground',
};

const str = (value: string): Token[] => [{ text: `'${value}'`, kind: 'string' }];
const list = (values: string[]): Token[] => [
    { text: '[', kind: 'punct' },
    ...values.flatMap((v, i) => [...str(v), ...(i < values.length - 1 ? [{ text: ', ', kind: 'punct' as const }] : [])]),
    { text: ']', kind: 'punct' },
];
const field = (key: string, value: Token[]): Token[] => [
    { text: '  ' },
    { text: key, kind: 'key' },
    { text: ': ', kind: 'punct' },
    ...value,
    { text: ',', kind: 'punct' },
];

// Filled from the same data as the Experience section, so it stays current
const current = roles[0];
const lines: Token[][] = [
    [{ text: '// Hi, thanks for stopping by', kind: 'comment' }],
    [
        { text: 'export const ', kind: 'keyword' },
        { text: 'ivaylo', kind: 'key' },
        { text: ' = {', kind: 'punct' },
    ],
    field('role', str(current.title)),
    field('focus', list([...new Set(roles.map((r) => r.focus)), 'AI'])),
    field('stack', list(current.stack)),
    field('experience', str(formatDuration(monthsBetween(roles[roles.length - 1].start)))),
    field('based', str('London, UK')),
    [{ text: '};', kind: 'punct' }],
];

/** A small editor window introducing me, in place of a hero image */
export function HeroCodeCard() {
    return (
        <Tilt className='min-w-0'>
            <figure
                aria-label='Code snippet introducing Ivaylo'
                className='overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-md'>
                <div className='flex items-center gap-1.5 border-b px-4 py-3'>
                    <span className='size-3 rounded-full bg-[#ff5f57]' />
                    <span className='size-3 rounded-full bg-[#febc2e]' />
                    <span className='size-3 rounded-full bg-[#28c840]' />
                    <span className='ml-3 font-mono text-xs text-muted-foreground'>ivaylo.ts</span>
                </div>
                <pre className='py-4 font-mono text-xs leading-6 sm:text-sm sm:leading-7'>
                    <code>
                        {lines.map((tokens, i) => (
                            <div key={i} className='flex pr-4 sm:pr-6'>
                                <span className='w-8 shrink-0 pr-3 text-right text-muted-foreground/50 select-none sm:w-10 sm:pr-4'>
                                    {i + 1}
                                </span>
                                {/* Long lines wrap on narrow screens, hanging under the value like a formatter would */}
                                <span className='min-w-0 -indent-[4ch] pl-[4ch] whitespace-pre-wrap'>
                                    {tokens.map((token, j) => (
                                        <span key={j} className={token.kind && tokenClass[token.kind]}>
                                            {token.text}
                                        </span>
                                    ))}
                                    {i === lines.length - 1 && (
                                        <span
                                            aria-hidden
                                            className='ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-primary motion-safe:animate-pulse'
                                        />
                                    )}
                                </span>
                            </div>
                        ))}
                    </code>
                </pre>
            </figure>
        </Tilt>
    );
}

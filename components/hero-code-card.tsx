import { CodeWindow, type OutputLine } from '@/components/code-window';
import { Tilt } from '@/components/tilt';
import { formatDuration, monthsBetween } from '@/lib/date';
import type { Profile, Role } from '@/utils/contentfulClient';

type Token = { text: string; kind?: 'keyword' | 'key' | 'string' | 'comment' | 'punct' };

const tokenClass: Record<NonNullable<Token['kind']>, string> = {
    keyword: 'text-violet-600 dark:text-violet-400',
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

// Filled from the site profile and the Experience roles (newest first), so it stays current
const buildLines = (profile: Profile, roles: Role[], variable: string): Token[][] => {
    const current = roles[0];
    const oldest = roles[roles.length - 1];
    return [
        [{ text: '// Hi, thanks for stopping by', kind: 'comment' }],
        [
            { text: 'export const ', kind: 'keyword' },
            { text: variable, kind: 'key' },
            { text: ' = {', kind: 'punct' },
        ],
        field('role', str(current?.title ?? profile.headline)),
        ...(profile.focusAreas?.length ? [field('focus', list(profile.focusAreas))] : []),
        ...(current?.stack?.length ? [field('stack', list(current.stack))] : []),
        ...(oldest ? [field('experience', str(formatDuration(monthsBetween(oldest.startDate))))] : []),
        ...(profile.location ? [field('based', str(profile.location))] : []),
        [{ text: '};', kind: 'punct' }],
    ];
};

/** A small editor window introducing me, in place of a hero image */
export function HeroCodeCard({ profile, roles }: { profile: Profile; roles: Role[] }) {
    // First name as a JS identifier, e.g. "Ivaylo Korchev" → "ivaylo"
    const variable = profile.name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9_$]/g, '') || 'me';
    const lines = buildLines(profile, roles, variable);
    const filename = `${variable}.ts`;
    // What the Run button prints. The last line points at the search-menu easter egg.
    const output: OutputLine[] = [
        { text: `$ npx tsx ${filename}`, tone: 'muted' },
        { text: `✓ Compiled ${filename} in 0.42s`, tone: 'success' },
        { text: `✓ 1 engineer found${profile.location ? ` · ${profile.location}` : ''}`, tone: 'success' },
        { text: `→ Psst: try "sudo hire ${variable}" in search`, tone: 'hint' },
    ];
    return (
        <Tilt className='min-w-0'>
            <figure
                aria-label={`Code snippet introducing ${profile.name}`}
                className='overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-md'>
                <CodeWindow filename={filename} output={output}>
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
                </CodeWindow>
            </figure>
        </Tilt>
    );
}

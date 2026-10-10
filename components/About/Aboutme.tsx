import { CalendarDays, MapPin, Smartphone } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { formatDuration, monthsBetween } from '@/lib/date';
import type { AboutEntry, RichTextNode } from '@/utils/contentfulClient';
import { roles } from '@/utils/experience';

const MarkdownRenderer = ({ node }: { node: RichTextNode }): React.ReactNode => {
    if (node.nodeType === 'document') {
        return node.content?.map((child, index) => <MarkdownRenderer key={index} node={child} />);
    } else if (node.nodeType === 'paragraph') {
        return (
            <p>
                {node.content?.map((child, index) => (
                    <MarkdownRenderer key={index} node={child} />
                ))}
            </p>
        );
    } else if (node.nodeType === 'text') {
        return node.value;
    } else if (node.nodeType === 'hyperlink') {
        return (
            <a
                href={node.data?.uri}
                className='font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-brand'
                target='_blank'
                rel='noreferrer'>
                {node.content?.[0]?.value}
            </a>
        );
    }
    return null;
};

// Experience is derived from the roles so it stays in step with the Experience section
const facts = [
    { icon: CalendarDays, label: 'Experience', value: formatDuration(monthsBetween(roles[roles.length - 1].start)) },
    { icon: Smartphone, label: 'Currently', value: `${roles[0].focus} ${roles[0].title}` },
    { icon: MapPin, label: 'Based in', value: 'London, UK' },
];

export const Aboutme = ({ data }: { data?: AboutEntry }) => {
    return (
        <section id='about' className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16'>
            <Reveal>
                <SectionHeading eyebrow='Get to know me' title='About me'>
                    Who I am and what I&apos;m working on.
                </SectionHeading>
            </Reveal>
            <div className='grid items-center gap-10 lg:grid-cols-[1fr_2fr]'>
                <Reveal>
                    <ul className='space-y-6'>
                        {facts.map(({ icon: Icon, label, value }) => (
                            <li key={label} className='flex items-center gap-4'>
                                <span className='flex size-11 shrink-0 items-center justify-center rounded-full border bg-card'>
                                    <Icon className='size-5 text-brand' />
                                </span>
                                <div>
                                    <p className='font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase'>
                                        {label}
                                    </p>
                                    <p className='mt-0.5 font-semibold'>{value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal>
                    <Card data-spotlight>
                        <CardContent className='space-y-4 text-lg leading-relaxed text-muted-foreground sm:px-8'>
                            {data?.fields?.description ? (
                                <MarkdownRenderer node={data.fields.description} />
                            ) : (
                                'No description available.'
                            )}
                        </CardContent>
                    </Card>
                </Reveal>
            </div>
        </section>
    );
};
export default Aboutme;

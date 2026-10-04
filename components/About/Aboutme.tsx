import { SectionHeading } from '@/components/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import type { AboutEntry, RichTextNode } from '@/utils/contentfulClient';

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

export const Aboutme = ({ data }: { data?: AboutEntry }) => {
    return (
        <section id='about' className='mx-auto max-w-6xl px-4 py-24 sm:px-6'>
            <div className='grid gap-10 lg:grid-cols-[1fr_2fr]'>
                <SectionHeading eyebrow='Get to know me' title='About me' />
                <Card>
                    <CardContent className='space-y-4 text-lg leading-relaxed text-muted-foreground sm:px-8'>
                        {data?.fields?.description ? (
                            <MarkdownRenderer node={data.fields.description} />
                        ) : (
                            'No description available.'
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
export default Aboutme;

'use client';

import { SectionTitle } from '../SectionTitle';

const MarkdownRenderer = ({ node }) => {
    console.log('Rendering node:', node);
    if (node.nodeType === 'document') {
        return node.content.map((child, index) => <MarkdownRenderer key={index} node={child} />);
    } else if (node.nodeType === 'paragraph') {
        return (
            <p className='mb-2'>
                {node.content.map((child, index) => (
                    <MarkdownRenderer key={index} node={child} />
                ))}
            </p>
        );
    } else if (node.nodeType === 'text') {
        return node.value;
    } else if (node.nodeType === 'hyperlink') {
        return (
            <a
                key={node.data.uri}
                href={node.data.uri}
                className='text-customyellow underline'
                target='_blank'
                rel='noreferrer'>
                {node.content[0].value}
            </a>
        );
    }
    return null;
};

export const Aboutme = ({ data }) => {
    return (
        <div id='about'>
            <SectionTitle name='about me' />
            <div className='container max-w-7xl mt-12 mx-auto p-5 xl:p-0  text-white font-mono' id='aboutme'>
                <div className='font-normal w-full  text-xl flex justify-center py-5 flex-col'>
                    {data?.fields?.description ? (
                        <MarkdownRenderer node={data.fields.description} />
                    ) : (
                        'No description available.'
                    )}
                </div>
            </div>
        </div>
    );
};
export default Aboutme;

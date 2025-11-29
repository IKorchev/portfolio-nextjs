'use client';

import { BsEnvelopeFill, BsGithub, BsLinkedin } from 'react-icons/bs';
import { SectionTitle } from '../SectionTitle';

const links = [
    {
        href: 'https://linkedin.com/in/ivaylo-korchev/',
        icon: <BsLinkedin width={10} height={10} className='inline' />,
        label: 'LinkedIn',
    },
    {
        href: 'https://github.com/ikorchev/',
        icon: <BsGithub width={10} height={10} className='inline' />,
        label: 'GitHub',
    },
    {
        href: 'mailto:korchev94@gmail.com',
        icon: <BsEnvelopeFill width={10} height={10} className='inline' />,
        label: 'Email',
    },
];

const Contact = () => {
    return (
        <footer id='contact'>
            <SectionTitle name='contact' />
            <div className='container  mx-auto mt-12 pb-5 text-gray-200'>
                <div className='my-12'>
                    <div className='flex flex-row justify-center gap-12'>
                        {links.map(({ href, icon, label }) => (
                            <a
                                key={label}
                                className='flex items-center gap-2'
                                href={href}
                                target='_blank'
                                rel='noreferrer'>
                                {icon} {label}
                            </a>
                        ))}
                    </div>
                </div>
                <p className='text-center'>
                    Copyright &copy; {new Date().getFullYear()}
                    <a
                        href='https://ikorchev.com/'
                        rel='noreferrer'
                        target='_blank'
                        className='text-center lg:text-right ml-2'>
                        IKORCHEV.COM
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Contact;

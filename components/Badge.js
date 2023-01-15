'use client';

import React from 'react';

const Badge = ({ text, link }) => {
  const baseStyles = 'text-lg px-3 pt-1 pb-1.5 bg-gray-700 rounded-md text-gray-100  ';
  return (
    <>
      {link ? (
        <a href={link} target='_blank' className={`${baseStyles} focus:underline focus:text-gray-300 hover:text-gray-300 hover:underline`} rel='noreferrer'>
          {text}
        </a>
      ) : (
        <span className={`${baseStyles} `}>{text}</span>
      )}
    </>
  );
};

export default Badge;

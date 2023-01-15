'use client';

const NavButton = ({ children, title, to }) => {
  return (
    <a href={to} className='nav-link whitespace-nowrap z-50 text-white'>
      {title}
      {children}
    </a>
  );
};

export default NavButton;

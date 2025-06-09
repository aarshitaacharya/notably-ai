import React from 'react';
import Logo from './Logo';

function Header() {
  return (
    <div className='px-5'>
      <nav className="z-10 w-full">
        <div>
          <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:gap-0 relative">
            <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
              <Logo />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

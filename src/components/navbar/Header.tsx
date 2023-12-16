'use client';

import { UserButton } from '@clerk/nextjs';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import Navbar from '@/components/navbar';
import { navBarVariants } from '@/components/navbar/animations';
import NavbarButton from '@/components/navbar/navbar-button';
import { MotionDiv } from '@/components/ui/MotionDiv';

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isMediumWidth = useMediaQuery('(max-width: 768px)');
  const isSmallHeight = useMediaQuery('(max-height: 684px)');

  return (
    <div className='pointer-events-none fixed h-full w-full'>
      <div
        className={`${
          isActive ? 'pointer-events-auto bg-gray-100/75' : 'bg-transparent'
        } relative h-full w-full transition duration-700`}
        onClick={() => setIsActive(false)}
      />
      <div
        className='absolute left-4 top-4 md:left-6 md:top-6'
        style={{
          height: `calc(100vh - ${isMediumWidth ? '0px' : '32px'})`,
          width: '100vw',
        }}
      >
        <MotionDiv
          variants={navBarVariants(isMediumWidth, isSmallHeight)}
          initial='closed'
          animate={isActive ? 'open' : 'closed'}
          className={`pointer-events-auto relative h-full w-full bg-primary`}
        >
          <AnimatePresence>
            {isActive && <Navbar setIsActive={setIsActive} />}
          </AnimatePresence>
        </MotionDiv>
        <NavbarButton isActive={isActive} setIsActive={setIsActive} />
      </div>
      <div className='pointer-events-auto absolute right-4 top-4 md:right-6 md:top-6'>
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </div>
  );
};

export default Header;

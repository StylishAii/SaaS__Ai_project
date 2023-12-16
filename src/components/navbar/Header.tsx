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
    <div className='fixed w-full h-full pointer-events-none'>
      <div
        className={`${
          isActive ? 'pointer-events-auto bg-gray-100/75' : 'bg-transparent'
        } relative h-full w-full transition duration-700`}
        onClick={() => setIsActive(false)}
      />
      <div
        className='absolute top-4 left-4 md:top-8 md:left-8'
        style={{
          height: `calc(100vh - ${isMediumWidth ? '0px' : '32px'})`,
          width: '100vw',
        }}
      >
        <MotionDiv
          variants={navBarVariants(isMediumWidth, isSmallHeight)}
          initial='closed'
          animate={isActive ? 'open' : 'closed'}
          className={`relative h-full w-full bg-primary pointer-events-auto`}
        >
          <AnimatePresence>
            {isActive && <Navbar setIsActive={setIsActive} />}
          </AnimatePresence>
        </MotionDiv>
        <NavbarButton isActive={isActive} setIsActive={setIsActive} />
      </div>
      <div className='absolute top-4 right-4 md:top-8 md:right-8'>
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </div>
  );
};

export default Header;

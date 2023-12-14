'use client';

import { UserButton } from '@clerk/nextjs';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import { navBarVariants } from '@/components/navbar/Animations';
import Navbar from '@/components/navbar/Navbar';
import NavbarButton from '@/components/navbar/NavbarButton';
import { MotionDiv } from '@/components/ui/MotionDiv';

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isMediumWidth = useMediaQuery('(max-width: 768px)');
  const isSmallHeight = useMediaQuery('(max-height: 684px)');

  return (
    <div className='fixed w-full'>
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
          className='relative h-full w-full rounded-[25px] bg-primary'
        >
          <AnimatePresence>{isActive && <Navbar />}</AnimatePresence>
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

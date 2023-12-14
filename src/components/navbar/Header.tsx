'use client';

import { UserButton } from '@clerk/nextjs';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { navBarVariants } from '@/components/navbar/Animations';
import Navbar from '@/components/navbar/Navbar';
import NavbarButton from '@/components/navbar/NavbarButton';
import { MotionDiv } from '@/components/ui/MotionDiv';

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className='w-full h-full'>
      <div className='fixed top-8 left-8'>
        <MotionDiv
          variants={navBarVariants}
          initial='closed'
          animate={isActive ? 'open' : 'closed'}
          className='relative md:h-[650px] md:w-[450px] rounded-lg bg-primary'
        >
          <AnimatePresence>{isActive && <Navbar />}</AnimatePresence>
        </MotionDiv>
        <NavbarButton isActive={isActive} setIsActive={setIsActive} />
      </div>
      <div className='absolute top-8 right-8'>
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </div>
  );
};

export default Header;

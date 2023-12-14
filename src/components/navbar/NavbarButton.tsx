'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { MotionDiv } from '@/components/ui/MotionDiv';
import { Button } from '@/components/ui/button';

interface NavbarButtonProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const NavbarButton = ({ isActive, setIsActive }: NavbarButtonProps) => {
  return (
    <Button
      className='absolute top-0 left-0 overflow-hidden'
      variant={'outline'}
      size={'icon'}
      onClick={() => setIsActive(!isActive)}
    >
      <MotionDiv
        className='relative h-full w-full'
        animate={{ top: isActive ? '-100%' : 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className='flex h-full w-full justify-center items-center'>
          <MenuIcon />
        </div>
        <div className='flex h-full w-full justify-center items-center'>
          <XIcon />
        </div>
      </MotionDiv>
    </Button>
  );
};

export default NavbarButton;

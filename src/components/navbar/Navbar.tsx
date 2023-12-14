'use client';

import { BotIcon } from 'lucide-react';
import Link from 'next/link';

import {
  navBarEntryFooterVariants,
  navBarEntryVariants,
} from '@/components/navbar/Animations';
import { links } from '@/components/navbar/Data';
import { MotionDiv } from '@/components/ui/MotionDiv';

const Navbar = () => {
  return (
    <nav className='box-border flex h-full flex-col justify-between px-[40px] pb-[50px] pt-[100px]'>
      <div className='flex flex-col gap-y-6'>
        {links.map((link, index) => (
          <div className='perspective-origin-bottom perspective-1' key={index}>
            <MotionDiv
              custom={index}
              variants={navBarEntryVariants}
              initial={'initial'}
              animate={'enter'}
              exit={'exit'}
            >
              <div className='flex flex-row gap-x-4 items-center'>
                <link.icon className='text-teal-500' />
                <Link className='text-2xl text-white' href={link.href}>
                  {link.title}
                </Link>
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center w-full'>
        <MotionDiv
          className='flex items-center justify-center gap-x-2 text-teal-600'
          variants={navBarEntryFooterVariants}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <BotIcon className='h-10 w-10' />
          <h1 className='text-3xl mt-1 cursor-default'>ChatXYZ</h1>
        </MotionDiv>
      </div>
    </nav>
  );
};

export default Navbar;

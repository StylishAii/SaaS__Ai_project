'use client';

import { BotIcon } from 'lucide-react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

import {
  navBarEntryFooterVariants,
  navBarEntryVariants,
} from '@/components/navbar/Animations';
import { links } from '@/components/navbar/Data';
import { MotionDiv } from '@/components/ui/MotionDiv';
import { cn } from '@/lib/utils';

const roboto = Roboto({ style: 'normal', weight: '700', subsets: ['latin'] });

const Navbar = () => {
  return (
    <nav className='box-border flex h-full flex-col justify-between px-10 pt-20'>
      <div
        className='flex flex-col gap-y-6 overflow-y-scroll mb-20 no-scrollbar'
        style={{ scrollbarWidth: 'none' }}
      >
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
                <Link
                  className='text-xl sm-height:md:text-2xl text-white'
                  href={link.href}
                >
                  {link.title}
                </Link>
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>
      <div
        className='absolute bottom-0 -translate-y-1/2 left-1/2 -translate-x-1/2 
        mb-2'
      >
        <MotionDiv
          custom={links.length}
          className='flex items-center justify-center gap-x-2 text-teal-600'
          variants={navBarEntryFooterVariants}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <BotIcon className='h-10 w-10' />
          <h1 className={cn('text-3xl mt-1 cursor-default', roboto.className)}>
            ChatXYZ
          </h1>
        </MotionDiv>
      </div>
    </nav>
  );
};

export default Navbar;

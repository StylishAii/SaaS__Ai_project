'use client';

import { BotIcon } from 'lucide-react';
import { Lato } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import {
  navBarEntryFooterVariants,
  navBarEntryVariants,
} from '@/components/navbar/Animations';
import { links } from '@/components/navbar/Data';
import { MotionDiv } from '@/components/ui/MotionDiv';

const lato = Lato({ style: 'normal', weight: '700', subsets: ['latin'] });

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='box-border flex h-full flex-col justify-between px-10 pt-20'>
      <div
        className='flex flex-col gap-y-1 overflow-y-scroll mb-20 no-scrollbar'
        style={{ scrollbarWidth: 'none' }}
      >
        {links.map(({ title, href, icon: Icon }, index) => (
          <div className='perspective-origin-bottom perspective-1' key={index}>
            <MotionDiv
              custom={index}
              variants={navBarEntryVariants}
              initial={'initial'}
              animate={'enter'}
              exit={'exit'}
            >
              <Link
                className={`flex flex-row items-center rounded-lg ${
                  pathname === href ? 'bg-white/10' : ''
                } hover:bg-white/10 py-2`}
                href={href}
              >
                <Icon className='text-teal-500 mx-4' />
                <p
                  className={`text-xl sm-height:md:text-2xl ${
                    pathname === href ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {title}
                </p>
              </Link>
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
          <h1 className={cn('text-3xl mt-1 cursor-default', lato.className)}>
            ChatXYZ
          </h1>
        </MotionDiv>
      </div>
    </nav>
  );
};

export default Navbar;

'use client';

import { BotIcon } from 'lucide-react';
import { Lato } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

import { cn } from '@/lib/utils';

import {
  navBarEntryFooterVariants,
  navBarEntryVariants,
} from '@/components/navbar/animations';
import { links } from '@/components/navbar/data';
import { MotionDiv } from '@/components/ui/MotionDiv';

const lato = Lato({ style: 'normal', weight: '700', subsets: ['latin'] });

interface NavbarProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setIsActive }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: MouseEvent, href: string) => {
    e.preventDefault();
    router.prefetch(href);
    setIsActive(false);
    setTimeout(() => router.push(href), 800);
  };

  return (
    <nav className='box-border flex h-full flex-col justify-between px-10 pt-20'>
      <div
        className='no-scrollbar mb-20 flex flex-col gap-y-1 overflow-y-scroll'
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
                } py-2 hover:bg-white/10`}
                href={href}
                onClick={e => handleClick(e, href)}
              >
                <Icon className='mx-4 text-teal-500' />
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
      <div className='absolute bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2 md:bottom-4'>
        <MotionDiv
          custom={links.length}
          className='flex items-center justify-center gap-x-2 text-teal-600'
          variants={navBarEntryFooterVariants}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <BotIcon className='h-10 w-10' />
          <h1 className={cn('mt-1 cursor-default text-3xl', lato.className)}>
            ChatXYZ
          </h1>
        </MotionDiv>
      </div>
    </nav>
  );
};

export default Navbar;

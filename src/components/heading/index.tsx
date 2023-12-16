import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Separator } from '../ui/separator';

interface HeadingProps {
  title: string;

  bgColor: string;
  textColor: string;
  icon: LucideIcon;
}

const Heading = ({ title, bgColor, textColor, icon: Icon }: HeadingProps) => {
  return (
    <div className={'px-[20px] md:px-6'}>
      <div className='flex flex-row items-center gap-x-2 md:gap-x-4'>
        <div
          className={cn(
            'relative flex h-8 w-8 items-center justify-center rounded-lg md:h-14 md:w-14',
            bgColor,
          )}
        >
          <Icon className={cn('h-4 w-4 md:h-8 md:w-8', textColor)} />
        </div>
        <h1 className={'z-10 text-3xl font-bold text-primary md:text-4xl'}>
          {title}
        </h1>
      </div>
      <Separator className='mt-4 h-[2px]' />
    </div>
  );
};

export default Heading;

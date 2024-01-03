import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import ResetFormButton from '@/components/reset-form-button';
import { Separator } from '@/components/ui/separator';

interface HeadingProps {
  title: string;
  api?: string;
  bgColor: string;
  textColor: string;
  showReset: boolean;
  icon: LucideIcon;
}

const Heading = ({
  title,
  api,
  bgColor,
  textColor,
  showReset,
  icon: Icon,
}: HeadingProps) => {
  return (
    <div className='w-full px-3 md:px-4'>
      <div className='flex w-full flex-row items-center gap-x-2 md:gap-x-4'>
        <div
          className={cn(
            'relative flex h-8 w-8 items-center justify-center rounded-lg md:h-10 md:w-10',
            bgColor,
          )}
        >
          <Icon className={cn('h-4 w-4 md:h-6 md:w-6', textColor)} />
        </div>
        <h1 className={'z-10 text-2xl font-bold text-primary md:text-3xl'}>
          {title}
        </h1>
        {api && (
          <ResetFormButton title={title} showReset={showReset} api={api} />
        )}
      </div>
      <Separator className='mt-2 h-[2px]' />
    </div>
  );
};

export default Heading;

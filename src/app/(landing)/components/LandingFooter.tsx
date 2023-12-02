import { ComputerIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

const LandingFooter = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <div className='flex flex-row gap-x-4'>
        <ComputerIcon className='h-6 w-6' />
        <p>AI SAAS</p>
      </div>
      <div className='flex flex-row gap-x-4'>
        <p className='text-xs text-muted-foreground'>Terms of use</p>
        <Separator
          className='my-auto h-3 bg-muted-foreground'
          orientation='vertical'
        />
        <p className='text-xs text-muted-foreground'>Privacy policy</p>
      </div>
    </div>
  );
};

export default LandingFooter;

import { Lato } from 'next/font/google';

import { cn } from '@/lib/utils';

import Services from '@/components/services';

const lato = Lato({ style: 'normal', weight: '700', subsets: ['latin'] });

const DashboardPage = () => {
  return (
    <div className='h-full w-full'>
      <div className='flex flex-col gap-y-4'>
        <h2
          className={cn(
            'text-2xl md:text-4xl font-bold text-center text-secondary-foreground',
            lato.className,
          )}
        >
          Welcome to ChatXYZ
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Empowering Your Software Stack with Intelligent Solutions
        </p>
      </div>
      <div className='mt-8 max-w-7xl mx-auto px-4 md:px-12'>
        <Services />
      </div>
    </div>
  );
};

export default DashboardPage;

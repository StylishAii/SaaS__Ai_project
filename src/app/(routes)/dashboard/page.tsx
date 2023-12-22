import { Lato } from 'next/font/google';

import { styles } from '@/lib/styles';
import { cn } from '@/lib/utils';

import Services from '@/components/services';

const lato = Lato({ style: 'normal', weight: '700', subsets: ['latin'] });

const DashboardPage = () => {
  return (
    <div className='h-full w-full'>
      <div className='flex flex-col gap-y-4'>
        <h2
          className={cn(
            'mt-12 text-center text-2xl font-bold text-secondary-foreground md:text-4xl',
            lato.className,
          )}
        >
          Welcome to ChatXYZ
        </h2>
        <p className='text-center text-sm font-light text-muted-foreground md:text-lg'>
          Empowering Your Software Stack with Intelligent Solutions
        </p>
      </div>
      <div className={cn('mt-8 pb-20', styles.paddingX)}>
        <Services />
      </div>
    </div>
  );
};

export default DashboardPage;

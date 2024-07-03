import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import Header from '@/components/navbar/header';

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <>
      <div className='relative z-20'>
        <Header />
      </div>
      <main className='h-dynamic w-full pt-[64px] md:pt-[72px]'>
        {children}
      </main>
    </>
  );
};

export default RoutesLayout;

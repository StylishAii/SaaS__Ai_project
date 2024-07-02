import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return <div className='h-full w-full'>{children}</div>;
};

export default LandingLayout;

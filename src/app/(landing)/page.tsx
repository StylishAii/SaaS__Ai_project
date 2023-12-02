import { Button } from '@/components/ui/button';

import LandingFooter from './components/LandingFooter';

const LandingPage = () => {
  return (
    <div className='flex h-screen w-full flex-row'>
      <div className='hidden bg-gray-900 md:flex md:w-1/2 lg:w-3/5'></div>
      <div className='relative w-full bg-black text-white md:w-1/2 lg:w-2/5'>
        <div className='mx-auto flex h-full w-[90%] flex-col items-center justify-center gap-y-4'>
          <h2 className='text-2xl font-bold sm:text-4xl'>Get Started</h2>
          <div className='flex w-full flex-col gap-x-2 gap-y-2 sm:flex-row'>
            <Button
              variant={'secondary'}
              className='w-full text-base sm:py-6 sm:text-lg'
            >
              Log in
            </Button>
            <Button
              variant={'secondary'}
              className='w-full text-base sm:py-6 sm:text-lg'
            >
              Sign up
            </Button>
          </div>
        </div>
        <div className='absolute bottom-12 flex w-full flex-row gap-x-4'>
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

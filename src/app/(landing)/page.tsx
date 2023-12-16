import Link from 'next/link';

import { Button } from '@/components/ui/button';

import ExamplePrompts from '@/app/(landing)/components/example-prompts';
import Heading from '@/app/(landing)/components/heading';
import LandingFooter from '@/app/(landing)/components/landing-footer';

const LandingPage = () => {
  return (
    <div className='flex h-full w-full flex-row overflow-hidden'>
      <div className='relative hidden bg-primary px-8  md:block md:w-1/2 lg:w-3/5'>
        <Heading />
        <div className='flex h-full w-full items-center justify-between'>
          <ExamplePrompts />
        </div>
      </div>
      <div className='relative flex w-full flex-col bg-black text-white md:w-1/2 lg:w-2/5'>
        <div className='flex px-4 py-2 md:hidden'>
          <Heading />
        </div>
        <div className='mx-auto flex h-full w-[90%] flex-col items-center justify-center gap-y-4'>
          <h2 className='text-2xl font-bold sm:text-4xl'>Get Started</h2>
          <div className='flex w-full flex-col gap-x-2 gap-y-2 sm:flex-row'>
            <Link className='w-full' href={'/sign-in'}>
              <Button
                size={'lg'}
                variant={'secondary'}
                className='w-full text-base sm:text-lg'
              >
                Log in
              </Button>
            </Link>
            <Link className='w-full' href={'/sign-up'}>
              <Button
                size={'lg'}
                variant={'secondary'}
                className='w-full text-base sm:text-lg'
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex w-full flex-row gap-x-4 pb-6 md-height:hidden'>
          <LandingFooter />
        </div>
        <div className='absolute bottom-12 hidden w-full flex-row gap-x-4 md-height:flex'>
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

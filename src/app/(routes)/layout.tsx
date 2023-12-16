import Header from '@/components/navbar/header';

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full bg-secondary'>
      <div className='relative z-30'>
        <Header />
      </div>
      <main className='h-full w-full pt-[70px] md:pt-[88px]'>{children}</main>
    </div>
  );
};

export default RoutesLayout;

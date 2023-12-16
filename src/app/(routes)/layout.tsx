import Header from '@/components/navbar/header';

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full bg-secondary'>
      <div className='relative z-30'>
        <Header />
      </div>
      <main className='pt-[75px] md:pt-[105px] h-full w-full'>{children}</main>
    </div>
  );
};

export default RoutesLayout;

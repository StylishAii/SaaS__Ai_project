import Header from '@/components/navbar/header';

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  // TODO: Show Navbar in 2XL+ screens

  return (
    <>
      <div className='relative z-30'>
        <Header />
      </div>
      <main className='h-dynamic w-full pt-[64px] md:pt-[88px]'>
        {children}
      </main>
    </>
  );
};

export default RoutesLayout;

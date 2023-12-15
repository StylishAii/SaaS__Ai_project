import Header from '@/components/navbar/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full bg-secondary'>
      <Header />
      <main className='pt-[75px] md:pt-[105px] h-full w-full'>{children}</main>
    </div>
  );
};

export default DashboardLayout;

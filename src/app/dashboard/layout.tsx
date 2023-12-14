import Header from '@/components/navbar/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full'>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-full'>
      <div
        className='z-50 hidden h-full bg-gray-900 md:fixed md:inset-y-0 
        md:flex md:w-72 md:flex-col'
      >
        <Sidebar />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

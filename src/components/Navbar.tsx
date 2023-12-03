import { MenuIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>
      <Button variant={'ghost'} size={'icon'} className='md:hidden'>
        <MenuIcon />
      </Button>
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </div>
  );
};

export default Navbar;

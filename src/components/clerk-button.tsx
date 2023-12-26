import { UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const ClerkButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Skeleton className='h-8 w-8 rounded-full bg-gray-300' />;
  }

  return <UserButton afterSignOutUrl='/' />;
};

export default ClerkButton;

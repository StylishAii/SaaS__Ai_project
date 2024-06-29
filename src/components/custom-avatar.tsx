import { useUser } from '@clerk/nextjs';
import { BotIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CustomAvatarProps {
  role: 'user' | 'bot';
}

const CustomAvatar = ({ role }: CustomAvatarProps) => {
  const { user } = useUser();

  if (role === 'user') {
    return (
      <Avatar className='h-8 w-8'>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className='relative'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-secondary'>
        <BotIcon className='h-6 w-6' />
      </div>
    </div>
  );
};

export default CustomAvatar;

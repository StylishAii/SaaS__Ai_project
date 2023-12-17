import { BotIcon } from 'lucide-react';

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className='flex h-full flex-col items-center justify-center text-muted-foreground'>
      <div className='relative h-24 w-24'>
        <BotIcon className='h-full w-full' />
      </div>
      <p className='text-center text-xl md:text-2xl'>{label}</p>
    </div>
  );
};

export default Empty;

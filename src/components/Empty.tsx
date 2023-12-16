import { BotIcon } from 'lucide-react';

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className='flex h-full flex-col items-center justify-center p-20 text-muted-foreground'>
      <BotIcon className='h-24 w-24' />
      <p className='text-center text-xl md:text-2xl'>{label}</p>
    </div>
  );
};

export default Empty;

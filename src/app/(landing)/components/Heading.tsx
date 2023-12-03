import { BotIcon } from 'lucide-react';

const Heading = () => {
  return (
    <div className='absolute flex py-4'>
      <h2 className='text-2xl font-semibold text-teal-500'>
        Chat<span className='uppercase'>xyz</span>
      </h2>
      <BotIcon className='absolute left-28 top-[13px] h-8 w-8 text-teal-500' />
    </div>
  );
};

export default Heading;

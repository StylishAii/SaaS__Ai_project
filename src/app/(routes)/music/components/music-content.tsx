'use client';

import { cn } from '@/lib/utils';

import Empty from '@/components/empty';

interface MusicContentProps {
  music: string | undefined;
}

const MusicContent = ({ music }: MusicContentProps) => {
  return (
    <div
      className={cn(
        'flex max-h-full min-h-[100px] w-full justify-center px-3 md:px-4',
        !music && 'h-full',
      )}
    >
      {!music ? (
        <Empty label='No music generated.' />
      ) : (
        <div className='no-scrollbar flex h-full w-full flex-col gap-y-4 overflow-y-auto'>
          <audio controls className='my-auto w-full'>
            <source src={music} />
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicContent;

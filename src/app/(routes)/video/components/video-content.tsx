'use client';

import { cn } from '@/lib/utils';

import Empty from '@/components/empty';

interface VideoContentProps {
  video: string | undefined;
}

const VideoContent = ({ video }: VideoContentProps) => {
  return (
    <div
      className={cn(
        'flex h-full min-h-[100px] w-full justify-center px-4 md:px-6',
        !video && 'h-full',
      )}
    >
      {!video ? (
        <Empty label='No video generated.' />
      ) : (
        <div className='no-scrollbar flex h-full w-full justify-center gap-y-4'>
          <video
            controls
            className='aspect-video w-full rounded-lg border bg-black'
          >
            <source src={video} />
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoContent;

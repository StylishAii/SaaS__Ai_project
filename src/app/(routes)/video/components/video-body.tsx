'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import VideoContent from './video-content';
import VideoForm from './video-form';

const VideoBody = () => {
  const [video, setVideo] = useState<string>();

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          !video ? 'justify-start' : 'justify-end',
        )}
      >
        <VideoContent video={video} />
        <div className={cn('w-full', !video && 'mt-auto')}>
          <VideoForm setVideo={setVideo} />
        </div>
      </div>
    </div>
  );
};

export default VideoBody;

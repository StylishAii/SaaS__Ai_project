'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import MusicContent from './music-content';
import MusicForm from './music-form';

const MusicBody = () => {
  const [music, setMusic] = useState<string>();

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          !music ? 'justify-start' : 'justify-end',
        )}
      >
        <MusicContent music={music} />
        <div className={cn('w-full', !music && 'mt-auto')}>
          <MusicForm music={music} setMusic={setMusic} />
        </div>
      </div>
    </div>
  );
};

export default MusicBody;

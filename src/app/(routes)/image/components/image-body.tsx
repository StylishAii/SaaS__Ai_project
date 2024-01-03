'use client';

import { useEffect } from 'react';

import { ImagePromptWithImages } from '@/db/types';
import { useImage } from '@/hooks/useImage';
import { cn } from '@/lib/utils';

import ImageContent from './image-content';
import ImageForm from './image-form';

interface ImageGenerationBodyProps {
  initialImagePrompts: ImagePromptWithImages[];
}

const ImageGenerationBody = ({
  initialImagePrompts,
}: ImageGenerationBodyProps) => {
  const { imagePrompts, setImagePrompts } = useImage();

  useEffect(() => {
    setImagePrompts(initialImagePrompts);
  }, [initialImagePrompts, setImagePrompts]);

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          imagePrompts.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <ImageContent />
        <div className={cn('w-full', imagePrompts.length === 0 && 'mt-auto')}>
          <ImageForm />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationBody;

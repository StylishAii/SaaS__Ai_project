'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Image } from '@/db/types';
import ImageContent from './image-content';
import ImageForm from './image-form';

interface ImageGenerationBodyProps {
  initialImages: Image[];
}

const ImageGenerationBody = ({ initialImages }: ImageGenerationBodyProps) => {
  const [images, setImages] = useState<string[]>(
    initialImages.map(image => image.url),
  );

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          images.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <ImageContent images={images} />
        <div className={cn('w-full', images.length === 0 && 'mt-auto')}>
          <ImageForm setImages={setImages} />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationBody;

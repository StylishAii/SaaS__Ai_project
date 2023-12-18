'use client';

import { cn } from '@/lib/utils';

import Empty from '@/components/empty';
import GeneratedImage from '@/components/generated-image';

interface ImageContentProps {
  images: string[];
}

const ImageContent = ({ images }: ImageContentProps) => {
  return (
    <div
      className={cn(
        'flex max-h-full min-h-[100px] w-full justify-center px-4 md:px-6',
        images.length === 0 && 'h-full',
      )}
    >
      {images.length === 0 ? (
        <Empty label='No images generated.' />
      ) : (
        <div className='no-scrollbar flex h-full w-full flex-col gap-4 overflow-auto'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {images.map((image, index) => (
              <GeneratedImage key={index} image={image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageContent;

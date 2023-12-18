'use client';

import { cn } from '@/lib/utils';

import Empty from '@/components/empty';

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
        <div>Images will be rendered here.</div>
      )}
    </div>
  );
};

export default ImageContent;

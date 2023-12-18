'use client';

import { cn } from '@/lib/utils';

import Empty from '@/components/empty';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Image from 'next/image';

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
        <div className='md:grid-colrs-2 mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
          {images.map((image, index) => (
            <Card key={index} className='overflow-hidden rounded-lg '>
              <div className='relative aspect-square'>
                <Image src={image} alt={'Image'} fill />
              </div>
              <CardFooter className='p-2 '>
                <Button
                  variant={'secondary'}
                  className='w-full'
                  onClick={() => window.open(image)}
                >
                  <Download className='mr-2 h-4 w-4' />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageContent;

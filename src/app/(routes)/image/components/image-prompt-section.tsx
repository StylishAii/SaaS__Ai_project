'use client';

import { ImagePromptWithImages } from '@/db/types';

import CustomAvatar from '@/components/custom-avatar';
import GeneratedImage from './generated-image';

interface ImagePromptSectionProps {
  imagePrompt: ImagePromptWithImages;
}

const ImagePromptSection = ({ imagePrompt }: ImagePromptSectionProps) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div
        className='flex w-full items-start gap-x-4 rounded-lg border 
        border-black/10 bg-white p-4'
      >
        <CustomAvatar role={'user'} />
        <p className='text-sm'>
          {imagePrompt.prompt}
          <span> (x{imagePrompt.amount})</span>
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {imagePrompt.images.map((image, index) => (
          <GeneratedImage key={index} image={image.url} />
        ))}
      </div>
    </div>
  );
};

export default ImagePromptSection;

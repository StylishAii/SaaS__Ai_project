'use client';

import axios from 'axios';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ImagePromptWithImages } from '@/db/types';

import CustomAvatar from '@/components/custom-avatar';
import { Button } from '@/components/ui/button';
import GeneratedImage from './generated-image';

interface ImagePromptSectionProps {
  imagePrompt: ImagePromptWithImages;
}

const ImagePromptSection = ({ imagePrompt }: ImagePromptSectionProps) => {
  const router = useRouter();

  const onDeleteImagePrompt = async () => {
    try {
      await axios.delete(`api/image/${imagePrompt.id}`);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      router.refresh();
    }
  };

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
        <div className='ml-auto'>
          <Button
            onClick={onDeleteImagePrompt}
            size={'icon'}
            variant={'destructive'}
          >
            <Trash2Icon />
          </Button>
        </div>
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

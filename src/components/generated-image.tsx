import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Image from 'next/image';

interface GeneratedImageProps {
  image: string;
}

const GeneratedImage = ({ image }: GeneratedImageProps) => {
  return (
    <Card className='overflow-hidden rounded-lg'>
      <div className='relative aspect-square'>
        <Image src={image} alt={'Image'} fill />
        <div className='absolute right-2 top-2'>
          <Button
            onClick={() => window.open(image)}
            variant={'secondary'}
            size={'icon'}
          >
            <Download className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedImage;

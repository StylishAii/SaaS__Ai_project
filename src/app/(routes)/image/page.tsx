import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchImages } from '@/actions/fetchImages';
import { ImageGeneration as image } from '@/constants';

import Heading from '@/components/heading';
import ImageGenerationBody from './components/image-body';

const ImageGenerationPage = async () => {
  const { title, api, icon, bgColor, textColor } = image;

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const images = await fetchImages(userId);

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ImageGenerationBody initialImages={images} />
    </div>
  );
};

export default ImageGenerationPage;

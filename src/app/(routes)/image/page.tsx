import { ImageGeneration as image } from '@/constants';

import Heading from '@/components/heading';
import ImageGenerationBody from './components/image-body';

const ImageGenerationPage = () => {
  const { title, api, icon, bgColor, textColor } = image;

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ImageGenerationBody />
    </div>
  );
};

export default ImageGenerationPage;

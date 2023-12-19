import { MusicGeneration as music } from '@/constants';

import Heading from '@/components/heading';
import MusicBody from './components/music-body';

const MusicPage = () => {
  const { title, icon, bgColor, textColor } = music;

  // TODO: on 2xl screens have navbar open as sidebar

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <MusicBody />
    </div>
  );
};

export default MusicPage;

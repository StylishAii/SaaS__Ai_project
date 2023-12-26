import { MusicGeneration as music } from '@/constants';

import Heading from '@/components/heading';
import MusicBody from './components/music-body';

const MusicPage = () => {
  const { title, api, icon, bgColor, textColor } = music;

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <MusicBody />
    </div>
  );
};

export default MusicPage;

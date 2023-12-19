import { VideoGeneration as video } from '@/constants';

import Heading from '@/components/heading';
import VideoBody from './components/video-body';

const VideoPage = () => {
  const { title, icon, bgColor, textColor } = video;

  // TODO: on 2xl screens have navbar open as sidebar

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <VideoBody />
    </div>
  );
};

export default VideoPage;

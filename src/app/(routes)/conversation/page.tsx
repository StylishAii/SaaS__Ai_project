import { Conversation as conversation } from '@/constants';

import Heading from '@/components/heading';
import ConversationBody from './components/conversation-body';

const ConversationPage = () => {
  const { title, icon, bgColor, textColor } = conversation;

  // TODO: on 2xl screens have navbar open as sidebar

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ConversationBody />
    </div>
  );
};

export default ConversationPage;

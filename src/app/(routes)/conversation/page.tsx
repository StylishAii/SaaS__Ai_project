import { Conversation as conversation } from '@/constants';

import ConversationForm from '@/app/(routes)/conversation/components/ConversationForm';
import Heading from '@/components/heading';

const ConversationPage = () => {
  const { title, icon, bgColor, textColor } = conversation;

  return (
    <div className='flex h-full flex-col justify-start'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <div className='mt-4'>Messages Content</div>
      <div className='mt-auto'>
        <ConversationForm />
      </div>
    </div>
  );
};

export default ConversationPage;

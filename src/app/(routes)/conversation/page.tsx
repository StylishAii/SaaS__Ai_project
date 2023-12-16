import { Conversation as conversation } from '@/constants';

import ConversationForm from '@/app/(routes)/conversation/components/ConversationForm';
import Heading from '@/components/heading';

const ConversationPage = () => {
  const { title, icon, bgColor, textColor } = conversation;

  return (
    <div className='h-full flex flex-col justify-between'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />

      <ConversationForm />
    </div>
  );
};

export default ConversationPage;

import { Conversation as conversation } from '@/constants';

import Heading from '@/components/heading';
import PromptForm from '@/components/PromptForm';

const ConversationPage = () => {
  const { title, icon, bgColor, textColor } = conversation;

  return (
    <div>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <PromptForm />
    </div>
  );
};

export default ConversationPage;

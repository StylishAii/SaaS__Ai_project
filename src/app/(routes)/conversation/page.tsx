import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { fetchUser } from '@/actions/fetchUser';
import { Conversation as conversation } from '@/constants';

import Heading from '@/components/heading';
import ConversationBody from './components/conversation-body';

const ConversationPage = async () => {
  const { title, icon, bgColor, textColor } = conversation;

  const user = await fetchUser();

  const userContext: ChatCompletionMessageParam = {
    role: 'system',
    content: user.about,
  };

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ConversationBody userContext={userContext} />
    </div>
  );
};

export default ConversationPage;

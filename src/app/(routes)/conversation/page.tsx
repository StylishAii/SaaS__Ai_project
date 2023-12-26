import { fetchConversations } from '@/actions/fetchConversations';
import { fetchUser } from '@/actions/fetchUser';
import { ConversationGeneration as conversationGeneration } from '@/constants';

import Heading from '@/components/heading';
import ConversationBody from './components/conversation-body';

const ConversationPage = async () => {
  const { title, api, icon, bgColor, textColor } = conversationGeneration;

  const user = await fetchUser();

  const conversations = await fetchConversations(user);

  const initialPrompts =
    conversations.length === 0
      ? [
          {
            role: 'system' as const,
            content: user.about,
          },
        ]
      : conversations;

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ConversationBody initialPrompts={initialPrompts} />
    </div>
  );
};

export default ConversationPage;

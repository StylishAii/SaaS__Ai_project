import { fetchPrompts } from '@/actions/fetchPrompts';
import { fetchUser } from '@/actions/fetchUser';
import { Conversation as conversation } from '@/constants';

import Heading from '@/components/heading';
import ConversationBody from './components/conversation-body';

const ConversationPage = async () => {
  const { title, icon, bgColor, textColor } = conversation;

  const user = await fetchUser();

  const prompts = await fetchPrompts(user);

  const userContext =
    prompts.length === 0
      ? [
          {
            role: 'system' as const,
            content: user.about,
          },
        ]
      : prompts;

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

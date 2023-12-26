import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchConversations } from '@/actions/fetchConversations';
import { ConversationGeneration as conversationGeneration } from '@/constants';

import Heading from '@/components/heading';
import ConversationBody from './components/conversation-body';

const ConversationPage = async () => {
  const { title, api, icon, bgColor, textColor } = conversationGeneration;

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const conversations = await fetchConversations(userId);

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <ConversationBody initialPrompts={conversations} />
    </div>
  );
};

export default ConversationPage;

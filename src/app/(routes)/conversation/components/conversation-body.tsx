'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

import ConversationContent from './conversation-content';
import ConversationForm from './conversation-form';

const ConversationBody = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div className='flex h-full flex-col gap-y-4'>
        <ConversationContent messages={messages} />
        <div className='mt-auto w-full'>
          <ConversationForm messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default ConversationBody;

'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

import ConversationContent from './ConversationContent';
import ConversationForm from './ConversationForm';

const ConversationBody = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);


  return (
    <div className='mx-auto h-full w-full max-w-6xl '>
      <div className='flex h-full flex-col gap-y-4 pt-4'>
        <ConversationContent messages={messages} />
        <div className='mt-auto w-full'>
          <ConversationForm  messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default ConversationBody;

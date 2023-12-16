'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

import ConversationContent from './ConversationContent';
import ConversationForm from './ConversationForm';

const ConversationBody = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  return (
    <div className={`flex h-full w-full flex-col gap-y-4 mt-4`}>
      <ConversationContent messages={messages} />
      <div className='mx-auto mt-auto w-full max-w-7xl'>
        <ConversationForm messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ConversationBody;

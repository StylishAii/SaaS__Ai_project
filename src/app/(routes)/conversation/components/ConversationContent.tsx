'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import Empty from '@/components/Empty';

interface ConversationContentProps {
  messages: ChatCompletionMessageParam[];
}

const ConversationContent = ({ messages }: ConversationContentProps) => {
  return (
    <div
      className='flex h-full min-h-[100px] w-full flex-col justify-end gap-y-4 
      px-4 md:px-6'
    >
      {messages.length === 0 ? (
        <Empty label='How can I help you today?' />
      ) : (
        messages.map((message, index) => (
          <div key={index}>{message.content as string}</div>
        ))
      )}
    </div>
  );
};

export default ConversationContent;

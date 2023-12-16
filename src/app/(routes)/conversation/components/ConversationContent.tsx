'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

interface ConversationContentProps {
  messages: ChatCompletionMessageParam[];
}

const ConversationContent = ({ messages }: ConversationContentProps) => {
  return (
    <div className='mx-auto flex h-full w-full max-w-7xl flex-col justify-end gap-y-4 px-4 md:px-6'>
      {messages.length === 0 ? (
        <div></div>
      ) : (
        messages.map((message, index) => (
          <div key={index}>{message.content as string}</div>
        ))
      )}
    </div>
  );
};

export default ConversationContent;

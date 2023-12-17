'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import Avatar from '@/components/custom-avatar';
import Empty from '@/components/empty';
import { cn } from '@/lib/utils';

interface ConversationContentProps {
  messages: ChatCompletionMessageParam[];
}

const ConversationContent = ({ messages }: ConversationContentProps) => {
  return (
    <div
      className='flex h-full min-h-[100px] w-full flex-col justify-end 
      gap-y-4 px-4 md:px-6 overflow-y-auto'
    >
      {messages.length === 0 ? (
        <Empty label='How can I help you today?' />
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex w-full items-start gap-x-4 rounded-lg p-4',
              message.role === 'user'
                ? 'border border-black/10 bg-white'
                : 'border border-black/10 bg-white',
            )}
          >
            {message.role === 'user' ? (
              <Avatar role={'user'} />
            ) : (
              <Avatar role={'bot'} />
            )}
            <p className='text-sm'>{message.content as string}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationContent;

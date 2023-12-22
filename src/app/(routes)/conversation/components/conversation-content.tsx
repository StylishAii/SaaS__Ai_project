'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { Fragment } from 'react';

import Avatar from '@/components/custom-avatar';
import Empty from '@/components/empty';
import { cn } from '@/lib/utils';

interface ConversationContentProps {
  messages: ChatCompletionMessageParam[];
}

const ConversationContent = ({ messages }: ConversationContentProps) => {
  const filteredMessages = messages.filter(
    message => message.role !== 'system',
  );

  return (
    <div
      className={cn(
        'flex max-h-full min-h-[100px] w-full justify-center px-4 md:px-6',
        filteredMessages.length === 0 && 'h-full',
      )}
    >
      {filteredMessages.length === 0 ? (
        <Empty label='How can I help you today?' />
      ) : (
        <div className='no-scrollbar flex h-full w-full flex-col gap-y-4 overflow-y-auto'>
          {filteredMessages.map(({ content, role }, index) => {
            const message = (content as string)
              .split('\n')
              .map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ));

            return (
              <div
                key={index}
                className={cn(
                  'flex w-full items-start gap-x-4 rounded-lg p-4',
                  role === 'user'
                    ? 'border border-black/10 bg-white'
                    : 'border border-black/10 bg-white',
                )}
              >
                {role === 'user' ? (
                  <Avatar role={'user'} />
                ) : (
                  <Avatar role={'bot'} />
                )}
                <p className='text-sm'>{message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationContent;

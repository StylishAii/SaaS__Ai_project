'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { codeAssistantSetting } from '../data';

import ConversationContent from './code-content';
import ConversationForm from './code-form';

const ConversationBody = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    codeAssistantSetting,
  ]);

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          messages.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <ConversationContent messages={messages} />
        <div className={cn('w-full', messages.length === 0 && 'mt-auto')}>
          <ConversationForm messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default ConversationBody;

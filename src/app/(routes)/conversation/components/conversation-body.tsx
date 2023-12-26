'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

import { useConversation } from '@/hooks/useConversation';
import ConversationContent from './conversation-content';
import ConversationForm from './conversation-form';

interface ConversationBodyProps {
  initialPrompts: ChatCompletionMessageParam[];
}

const ConversationBody = ({ initialPrompts }: ConversationBodyProps) => {
  const { conversation, setConversation } = useConversation();

  useEffect(() => {
    setConversation(initialPrompts);
  }, [initialPrompts, setConversation]);

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          conversation.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <ConversationContent />
        <div className={cn('w-full', conversation.length === 0 && 'mt-auto')}>
          <ConversationForm />
        </div>
      </div>
    </div>
  );
};

export default ConversationBody;

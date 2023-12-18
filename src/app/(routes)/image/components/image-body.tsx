'use client';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { imageGenerationSetting } from '../data';

import ImageContent from './image-content';
import ImageForm from './image-form';

const ImageGenerationBody = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    imageGenerationSetting,
  ]);

  return (
    <div className='mx-auto mt-4 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-4',
          messages.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <ImageContent messages={messages} />
        <div className={cn('w-full', messages.length === 0 && 'mt-auto')}>
          <ImageForm messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationBody;

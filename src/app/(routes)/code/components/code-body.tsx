'use client';

import { useCode } from '@/hooks/useCode';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import CodeGenerationContent from './code-content';
import CodeGenerationForm from './code-form';

interface CodeBodyProps {
  initialPrompts: ChatCompletionMessageParam[];
}

const CodeGenerationBody = ({ initialPrompts }: CodeBodyProps) => {
  const { code, setCode } = useCode();

  useEffect(() => {
    setCode(initialPrompts);
  }, [initialPrompts, setCode]);

  return (
    <div className='mx-auto mt-2 h-full w-full max-w-6xl overflow-hidden'>
      <div
        className={cn(
          'flex h-full flex-col gap-y-2',
          code.length === 0 ? 'justify-start' : 'justify-end',
        )}
      >
        <CodeGenerationContent />
        <div className={cn('w-full', code.length === 0 && 'mt-auto')}>
          <CodeGenerationForm />
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationBody;

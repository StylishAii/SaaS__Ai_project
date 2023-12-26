'use client';

import Markdown from 'react-markdown';

import { useCode } from '@/hooks/useCode';
import { cn } from '@/lib/utils';

import Avatar from '@/components/custom-avatar';
import Empty from '@/components/empty';

const CodeGenerationContent = () => {
  const { code } = useCode();

  const filteredMessages = code.filter(
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
        <Empty label='Need help with anything?' />
      ) : (
        <div className='no-scrollbar flex h-full w-full flex-col gap-y-4 overflow-y-auto'>
          {filteredMessages.map((message, index) => (
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
              <Markdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className='list-disc pl-4' {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className='mb-1' {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <div className='my-2 w-full overflow-auto rounded-lg bg-black/10 p-2'>
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className='rounded-lg bg-black/10 p-1' {...props} />
                  ),
                }}
                className={'overflow-auto text-sm leading-7'}
              >
                {message.content as string}
              </Markdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeGenerationContent;

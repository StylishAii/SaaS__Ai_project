'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';

import { useCode } from '@/hooks/useCode';
import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

import Avatar from '@/components/custom-avatar';
import Empty from '@/components/empty';
import ScrollToBottomArrow from '@/components/scroll-to-bottom-arrow';

const CodeGenerationContent = () => {
  const { code } = useCode();
  const [isShowArrow, setIsShowArrow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const divRef = useRef<HTMLDivElement>(null!);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    setIsShowArrow(
      divRef.current.scrollTop + divRef.current.clientHeight <
        divRef.current.scrollHeight - 200,
    );
  };

  useScroll(divRef, handleScroll);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [isMounted]);

  useEffect(() => {
    scrollToBottom();
  }, [code]);

  const filteredMessages = useMemo(
    () => code.filter(message => message.role !== 'system'),
    [code],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex max-h-full min-h-[100px] w-full justify-center px-3 md:px-4',
        filteredMessages.length === 0 && 'h-full',
      )}
    >
      {filteredMessages.length === 0 ? (
        <Empty label='Need help with anything?' />
      ) : (
        <div
          ref={divRef}
          className='no-scrollbar flex h-full w-full flex-col gap-y-4 overflow-y-auto'
        >
          {filteredMessages.map((message, index) => (
            <div
              key={index}
              className='flex w-full items-start gap-x-4 rounded-lg border 
              border-black/10 bg-white p-4'
            >
              {message.role === 'user' ? (
                <Avatar role={'user'} />
              ) : (
                <Avatar role={'bot'} />
              )}
              <Markdown
                components={{
                  ol: ({ node, ...props }) => (
                    <ol className='list-decimal pl-6' {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className='mb-1' {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <div
                      className='my-2 w-full overflow-auto rounded-lg 
                    bg-black/10 p-2'
                    >
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
      <ScrollToBottomArrow isTrigger={isShowArrow} onClick={scrollToBottom} />
    </div>
  );
};

export default CodeGenerationContent;

'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { useConversation } from '@/hooks/useConversation';
import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

import Avatar from '@/components/custom-avatar';
import Empty from '@/components/empty';
import ScrollToBottomArrow from '@/components/scroll-to-bottom-arrow';

const ConversationContent = () => {
  const { conversation } = useConversation();
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
      if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }
  }, [isMounted]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const filteredMessages = useMemo(
    () => conversation.filter(message => message.role !== 'system'),
    [conversation],
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
        <Empty label='How can I help you today?' />
      ) : (
        <div
          ref={divRef}
          className='no-scrollbar flex h-full w-full flex-col gap-y-4 overflow-y-auto'
        >
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
      <ScrollToBottomArrow isTrigger={isShowArrow} onClick={scrollToBottom} />
    </div>
  );
};

export default ConversationContent;

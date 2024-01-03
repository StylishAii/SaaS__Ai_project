'use client';

import { useEffect, useRef, useState } from 'react';

import { useImage } from '@/hooks/useImage';
import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

import Empty from '@/components/empty';
import ScrollToBottomArrow from '@/components/scroll-to-bottom-arrow';
import ImagePromptSection from './image-prompt-section';

const ImageContent = () => {
  const { imagePrompts } = useImage();
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
  }, [imagePrompts]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex max-h-full min-h-[100px] w-full justify-center px-3 md:px-4',
        imagePrompts.length === 0 && 'h-full',
      )}
    >
      {imagePrompts.length === 0 ? (
        <Empty label='No images generated.' />
      ) : (
        <div
          ref={divRef}
          className='no-scrollbar flex h-full w-full flex-col gap-4 overflow-auto'
        >
          {imagePrompts.map((imagePrompt, index) => (
            <ImagePromptSection key={index} imagePrompt={imagePrompt} />
          ))}
        </div>
      )}
      <ScrollToBottomArrow isTrigger={isShowArrow} onClick={scrollToBottom} />
    </div>
  );
};

export default ImageContent;

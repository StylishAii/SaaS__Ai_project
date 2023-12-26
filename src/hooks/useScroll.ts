import { RefObject, useEffect } from 'react';

type ScrollEventHandler = (event: Event) => void;

const useScroll = (
  ref: RefObject<HTMLElement>,
  handler: ScrollEventHandler,
) => {
  useEffect(() => {
    const element = ref.current;

    if (element) {
      // Add the scroll event listener to the provided ref when the component mounts
      element.addEventListener('scroll', handler);
    }

    // Remove the scroll event listener when the component unmounts
    return () => {
      if (element) {
        element.removeEventListener('scroll', handler);
      }
    };
  }, [ref, handler]);
};

export default useScroll;

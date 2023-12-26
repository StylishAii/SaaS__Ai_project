import { AnimatePresence } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';

import scrollableDivArrowVariants from '@/lib/animations';

import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/ui/motion-div';

interface ScrollToBottomArrowProps {
  isTrigger: boolean;
  onClick: () => void;
}

const ScrollToBottomArrow = ({
  isTrigger,
  onClick,
}: ScrollToBottomArrowProps) => {
  return (
    <AnimatePresence>
      {isTrigger && (
        <MotionDiv
          variants={scrollableDivArrowVariants}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          className='absolute bottom-4 left-1/2 -translate-x-1/2'
        >
          <Button onClick={onClick} size={'icon'} variant={'ghost'}>
            <ArrowDownIcon className='text-muted-foreground' />
          </Button>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ScrollToBottomArrow;

import { Variants } from 'framer-motion';

const scollableDivArrowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export { scollableDivArrowVariants };

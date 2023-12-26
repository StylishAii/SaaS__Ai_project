import { Variants } from 'framer-motion';

const scrollableDivArrowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default scrollableDivArrowVariants;

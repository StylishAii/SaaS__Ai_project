'use client';

import { AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { MotionDiv } from '@/components/ui/MotionDiv';

import { LandingPrompts } from '@/constants';

const ExamplePrompts = () => {
  const [index, setIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(LandingPrompts[0]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      setCurrentPrompt(LandingPrompts[index + 1]);
      if (index === 3) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      setIsDone(false);
    }
  }, [isDone, index]);

  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    enter: {
      transition: { duration: 0.5 },
      opacity: 1,
      y: 0,
    },
    exit: {
      transition: { duration: 0.5 },
      opacity: 0,
      y: 20,
    },
  };

  const currentQuestions = (
    currentPrompt.questions.flatMap(question => [question, 3000]) as any[]
  ).concat([() => setIsDone(true)]);

  return (
    <AnimatePresence mode={'wait'}>
      <MotionDiv
        key={currentPrompt.title}
        variants={variants}
        initial='initial'
        animate='enter'
        exit={'exit'}
      >
        <h1 className='text-4xl font-semibold leading-[50px] text-teal-500'>
          {currentPrompt.title}
        </h1>
        <TypeAnimation
          omitDeletionAnimation
          className='text-4xl font-normal text-teal-500'
          sequence={currentQuestions}
        />
      </MotionDiv>
    </AnimatePresence>
  );
};

export default ExamplePrompts;

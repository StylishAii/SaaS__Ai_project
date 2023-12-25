'use client';

import axios from 'axios';

import { Button } from '@/components/ui/button';

interface ResetFormProps {
  title: string;
}

const ResetForm = ({ title }: ResetFormProps) => {
  const onReset = async () => {
    const response = await axios.post('/api/conversation', {});
    console.log('reset');
  };

  return (
    title === 'Conversation' && (
      <Button
        onClick={onReset}
        className='ml-auto'
        variant={'default'}
        size={'sm'}
      >
        Reset
      </Button>
    )
  );
};

export default ResetForm;

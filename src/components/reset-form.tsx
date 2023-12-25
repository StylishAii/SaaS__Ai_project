'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useConversation } from '@/hooks/useConversation';

import { Button } from '@/components/ui/button';

interface ResetFormProps {
  title: string;
}

const ResetForm = ({ title }: ResetFormProps) => {
  const router = useRouter();
  const { resetConversation } = useConversation();

  const onReset = async () => {
    try {
      const response = await axios.delete('/api/conversation');

      if (response.status === 200) {
        toast.success('Conversation reset.');
        resetConversation();
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      router.refresh();
    }
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

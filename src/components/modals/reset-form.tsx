'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { useConversation } from '@/hooks/useConversation';
import { useResetFormModal } from '@/hooks/useResetFormModal';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

const ResetFormModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useResetFormModal();
  const { resetConversation } = useConversation();
  const router = useRouter();

  const onReset = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      onClose();
      router.refresh();
    }
  };

  return (
    <Modal
      title='Reset conversation history?'
      description='This cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end gap-x-2 pt-6'>
        <Button disabled={isLoading} variant={'destructive'} onClick={onReset}>
          Reset Conversation
        </Button>
      </div>
    </Modal>
  );
};

export default ResetFormModal;

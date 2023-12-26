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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { resetConversation } = useConversation();
  const { isOpen, onClose, title, api } = useResetFormModal();

  const fixedTitle = title?.split(' ')[0];

  const onReset = async () => {
    try {
      setIsLoading(true);
      if (api) {
        const response = await axios.delete(api);

        if (response.status === 200) {
          toast.success(`${title} Reset`, { position: 'top-right' });
          resetConversation();
        } else {
          toast.error('Something went wrong.', { position: 'top-right' });
        }
      } else {
        throw new Error('No API provided.');
      }
    } catch (err: any) {
      toast.error(err.message, { position: 'top-right' });
      console.log(err);
    } finally {
      setIsLoading(false);
      onClose();
      router.refresh();
    }
  };

  return (
    <Modal
      title={`Reset ${title} History?`}
      description='This cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end gap-x-2 pt-6'>
        <Button disabled={isLoading} variant={'destructive'} onClick={onReset}>
          Reset {fixedTitle}
        </Button>
      </div>
    </Modal>
  );
};

export default ResetFormModal;

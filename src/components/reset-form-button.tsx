'use client';

import { Button } from '@/components/ui/button';
import { useResetFormModal } from '@/hooks/useResetFormModal';

interface ResetFormButtonProps {
  title: string;
}

const ResetFormButton = ({ title }: ResetFormButtonProps) => {
  const { onOpen } = useResetFormModal();

  return (
    title === 'Conversation' && (
      <Button
        onClick={onOpen}
        className='ml-auto'
        variant={'default'}
        size={'sm'}
      >
        Reset
      </Button>
    )
  );
};

export default ResetFormButton;

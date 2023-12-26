'use client';

import { Button } from '@/components/ui/button';
import { useResetFormModal } from '@/hooks/useResetFormModal';

interface ResetFormButtonProps {
  title: string;
  api: string;
}

const ResetFormButton = ({ title, api }: ResetFormButtonProps) => {
  const { onOpen } = useResetFormModal();

  return (
    (title === 'Conversation' || 'Code') && (
      <Button
        onClick={() => onOpen({ title, api })}
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

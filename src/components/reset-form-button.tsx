'use client';

import { Button } from '@/components/ui/button';
import { useResetFormModal } from '@/hooks/useResetFormModal';

interface ResetFormButtonProps {
  title: string;
  api: string;
  showReset: boolean;
}

const ResetFormButton = ({ title, api, showReset }: ResetFormButtonProps) => {
  const { onOpen } = useResetFormModal();

  return (
    showReset && (
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

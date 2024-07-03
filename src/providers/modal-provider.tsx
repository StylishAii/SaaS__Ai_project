'use client';

import { useEffect, useState } from 'react';

import ResetFormModal from '@/components/modals/reset-form';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ResetFormModal />
    </>
  );
};

export default ModalProvider;

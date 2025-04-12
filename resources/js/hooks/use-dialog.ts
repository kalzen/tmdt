import { useState } from 'react';

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return {
    isOpen,
    onOpenChange,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
}

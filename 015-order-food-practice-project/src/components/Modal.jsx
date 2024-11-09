import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, title, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      className="backdrop:bg-black/50 py-4 px-4 w-3/4 max-w-2xl bg-stone-300 rounded-lg"
      ref={dialog}
      onClose={onClose}
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

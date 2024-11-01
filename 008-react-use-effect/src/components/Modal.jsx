import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // The below code is synchronous but is used with useEffect because dialog ref won't be available if we execute the code directly before render function and will cause crash. Hence useEffect is used to execute it once the component is rendered
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
    // Here we have added open as dependency so the effect will execute whenever open changes
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* This check is added because we are using a timer inside DeleteConfirmation Component which will be set as soon as the children is render */}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;

import CtaButton from './CtaButton.jsx';
import Modal from './Modal.jsx';

export default function SuccessModal({ open, onClose }) {
  const paragraphClass = 'text-md mt-2 font-light';

  return (
    <Modal open={open} title="Success!" onClose={onClose}>
      <>
        <p className={paragraphClass}>Your order was submitted successfully.</p>
        <p className={paragraphClass}>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <form method="dialog" className="flex gap-4 justify-end mt-4">
          <CtaButton type="button" onClick={onClose} ctaText="Okay" />
        </form>
      </>
    </Modal>
  );
}

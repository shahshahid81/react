import { useContext } from 'react';
import CtaButton from './CtaButton.jsx';
import Modal from './Modal.jsx';
import { CartContext } from '../store/shopping-cart-context.jsx';

export default function CartModal({ open, onClose, onCheckout }) {
  function handleGoToCheckout() {
    onClose();
    onCheckout();
  }

  const { items, incrementItemQuantity, decrementItemQuantity } =
    useContext(CartContext);

  const totalCost = items.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  const buttonClass =
    'bg-stone-800 text-yellow-400 hover:text-yellow-500 w-6 h-6 rounded-full';

  return (
    <Modal open={open} title="Your Cart" onClose={onClose}>
      <>
        <ul className="list-none mt-4">
          {items.map((item) => (
            <li key={item.name} className="my-2">
              <p className="text-md font-light flex justify-between">
                <span>
                  {item.name} - {item.quantity} x ${item.price}
                </span>
                <span className="flex gap-3 items-center justify-center">
                  <button
                    className={buttonClass}
                    onClick={() => decrementItemQuantity(item)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={buttonClass}
                    onClick={() => incrementItemQuantity(item)}
                  >
                    +
                  </button>
                </span>
              </p>
            </li>
          ))}
        </ul>
        <p className="flex justify-end font-bold mt-6">
          ${totalCost.toFixed(2)}
        </p>
        <form method="dialog" className="flex gap-4 justify-end mt-4">
          <button className="text-stone-900 font-light">Close</button>
          {items.length ? (
            <CtaButton
              type="button"
              onClick={handleGoToCheckout}
              ctaText="Go to Checkout"
            />
          ) : null}
        </form>
      </>
    </Modal>
  );
}

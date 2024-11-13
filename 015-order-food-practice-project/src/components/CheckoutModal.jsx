import Modal from './Modal.jsx';
import Input from './Input.jsx';
import CtaButton from './CtaButton.jsx';
import { useContext, useState } from 'react';
import { CartContext } from '../store/shopping-cart-context.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
};

export default function CheckoutModal({ open, onClose, onSuccess }) {
  const { items, resetCart } = useContext(CartContext);

  const totalCost = items.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  const {
    error: errorMessage,
    isLoading,
    executeRequest,
  } = useHttp(null, 'http://localhost:4600/orders', requestConfig);

  async function submitOrder(customer) {
    try {
      const result = await executeRequest(
        JSON.stringify({
          order: {
            customer,
            items,
          },
        })
      );
      if (result) {
        resetCart();
        onClose();
        onSuccess();
      }
    } catch (error) {}
  }

  async function handleSubmitOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await submitOrder(data);
  }

  return (
    <Modal open={open} title="Checkout" onClose={onClose}>
      <div className="my-2">
        <p>Total Amount: ${totalCost}</p>
        <form onSubmit={handleSubmitOrder}>
          <Input required label="Full Name" name="name" id="name" type="text" />
          <Input
            required
            label="E-Mail Address"
            type="email"
            name="email"
            id="email"
          />
          <Input
            required
            label="Street"
            type="text"
            name="street"
            id="street"
          />

          <div className="flex gap-4">
            <Input
              required
              label="Postal Code"
              type="text"
              name="postal-code"
              id="postal-code"
            />
            <Input required label="City" type="text" name="city" id="city" />
          </div>

          {errorMessage ? <p className="text-red-600">{errorMessage}</p> : null}

          <div className="flex gap-4 justify-end">
            <button
              disabled={isLoading}
              type="button"
              onClick={onClose}
              className="text-stone-900 font-light"
            >
              Close
            </button>
            <CtaButton
              disabled={isLoading}
              ctaText="Submit Order"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

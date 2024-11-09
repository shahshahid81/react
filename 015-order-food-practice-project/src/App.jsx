import Header from './components/Header.jsx';
import FoodItems from './components/FoodItems.jsx';
import CartModal from './components/CartModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import SuccessModal from './components/SuccessModal.jsx';
import { useState } from 'react';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <CartContextProvider>
      <Header onClick={() => setIsCartModalOpen(true)} />
      <FoodItems />
      <CartModal
        open={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={() => setIsCheckoutModalOpen(true)}
      />
      <CheckoutModal
        open={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSuccess={() => setIsSuccessModalOpen(true)}
      />
      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </CartContextProvider>
  );
}

export default App;

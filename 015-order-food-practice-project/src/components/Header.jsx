import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/shopping-cart-context';

export default function Header({ onClick }) {
  const { items } = useContext(CartContext);

  const totalItemsCount = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <header className="flex mt-12 mx-40 items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full border-yellow-400 border-2"
          src={logo}
          alt="Burger Logo"
        />
        <h1 className="text-[2rem] font-sans font-bold uppercase text-yellow-400 tracking-widest">
          ReactFood
        </h1>
      </div>
      <button
        onClick={onClick}
        className="text-2xl font-sans text-yellow-400 hover:text-yellow-600 tracking-wider"
      >
        Cart({totalItemsCount})
      </button>
    </header>
  );
}

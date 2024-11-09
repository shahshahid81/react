import { useContext } from 'react';
import CtaButton from './CtaButton.jsx';
import { CartContext } from '../store/shopping-cart-context.jsx';

export default function FoodItem({ item }) {
  const { addItemToCart } = useContext(CartContext);

  const { name, description, price, image } = item;
  return (
    <div className="flex flex-col justify-between gap-2 items-center h-[100%]">
      <img src={`http://localhost:4600/${image}`} alt={name} />
      <p className="text-2xl font-semibold text-center">{name}</p>
      <p className="inline-block text-center rounded-r-md text-yellow-400 font-semibold text-sm bg-stone-800 px-8 py-2">
        ${price}
      </p>
      <p className="text-md leading-5 text-center px-6">{description}</p>
      <CtaButton
        type="button"
        ctaText="Add to Cart"
        onClick={() => addItemToCart(item)}
      />
    </div>
  );
}

// File is not used anywhere. Just stored to refer code without reducer.

import { createContext, useState } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

//We can pass any value to createContext like array, number etc. Here, we have passed Object
// Also, the value passed here is used only if there is no provider for the component where the context is used. For example, if we are using context in Cart Component and it is not wrapped inside a provider with default value, the below provided value will be used. We can specify null as well if we don't want to set a default
export const CartContext = createContext({
  items: [],
  addItemsToCart: () => {},
  updateItemQuantity: () => {},
});

// Name can be anything but standard to use Provider in name
export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items, // Linking state values to the context.
    addItemToCart: handleAddItemToCart, // Linking update function to context
    updateItemQuantity: handleUpdateCartItemQuantity, // Linking update function to context
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

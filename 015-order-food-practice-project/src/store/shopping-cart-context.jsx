import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {},
  incrementItemQuantity: (item) => {},
  decrementItemQuantity: (item) => {},
});

function cartReducer(state, action) {
  function changeQuantity(item, increment) {
    return state
      .map((value) => {
        const newItem = { ...value };
        if (newItem.id === item.id) {
          newItem.quantity = newItem.quantity + (increment ? 1 : -1);
        }
        return newItem;
      })
      .filter((item) => item.quantity > 0);
  }

  if (action.type === 'ADD_ITEM') {
    if (state.findIndex((item) => item.id === action.item.id) !== -1) {
      return changeQuantity(action.item, true);
    }

    const newState = state.map((item) => ({ ...item }));
    newState.push({ ...action.item, quantity: 1 });
    return newState;
  }

  if (action.type === 'INCREMENT_QUANTITY') {
    return changeQuantity(action.item, true);
  }

  if (action.type === 'DECREMENT_QUANTITY') {
    return changeQuantity(action.item, false);
  }

  if (action.type === 'RESET_CART') {
    return [];
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartItemsState, cartItemsDispatch] = useReducer(cartReducer, []);

  function handleAddItemToCart(item) {
    cartItemsDispatch({ type: 'ADD_ITEM', item });
  }

  function handleIncrementItemQuantity(item) {
    cartItemsDispatch({ type: 'INCREMENT_QUANTITY', item });
  }

  function handleDecrementItemQuantity(item) {
    cartItemsDispatch({ type: 'DECREMENT_QUANTITY', item });
  }

  function handleResetCart() {
    cartItemsDispatch({ type: 'RESET_CART' });
  }

  const ctxValue = {
    items: cartItemsState,
    addItemToCart: handleAddItemToCart,
    incrementItemQuantity: handleIncrementItemQuantity,
    decrementItemQuantity: handleDecrementItemQuantity,
    resetCart: handleResetCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

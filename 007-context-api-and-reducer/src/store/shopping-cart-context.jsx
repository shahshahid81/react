// It is convention to store context file in store folder.

import { createContext, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

//We can pass any value to createContext like array, number etc. Here, we have passed Object
// Also, the value passed here is used only if there is no provider for the component where the context is used. For example, if we are using context in Cart Component and it is not wrapped inside a provider with default value, the below provided value will be used. We can specify null as well if we don't want to set a default
export const CartContext = createContext({
  items: [],
  addItemsToCart: () => {},
  updateItemQuantity: () => {},
});

// Defined function outside component since we don't want to refer to any state from component and we don't want to re create this on every render.
// First param is the latest state snapshot and second is the data passed by dispatch method
function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload.id
      );
      updatedItems.push({
        id: action.payload.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

// Name can be anything but standard to use Provider in name
export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    // We can pass any data type like array, number etc. It is convention to pass type and payload so that we can use type to identify the action to perform and payload needed to perform the action.
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: { id },
    });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems = [...prevShoppingCart.items];

    //   const existingCartItemIndex = updatedItems.findIndex(
    //     (cartItem) => cartItem.id === id
    //   );
    //   const existingCartItem = updatedItems[existingCartItemIndex];

    //   if (existingCartItem) {
    //     const updatedItem = {
    //       ...existingCartItem,
    //       quantity: existingCartItem.quantity + 1,
    //     };
    //     updatedItems[existingCartItemIndex] = updatedItem;
    //   } else {
    //     const product = DUMMY_PRODUCTS.find((product) => product.id === id);
    //     updatedItems.push({
    //       id: id,
    //       name: product.title,
    //       price: product.price,
    //       quantity: 1,
    //     });
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems = [...prevShoppingCart.items];
    //   const updatedItemIndex = updatedItems.findIndex(
    //     (item) => item.id === productId
    //   );

    //   const updatedItem = {
    //     ...updatedItems[updatedItemIndex],
    //   };

    //   updatedItem.quantity += amount;

    //   if (updatedItem.quantity <= 0) {
    //     updatedItems.splice(updatedItemIndex, 1);
    //   } else {
    //     updatedItems[updatedItemIndex] = updatedItem;
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });
  }

  const ctxValue = {
    items: shoppingCartState.items, // Linking state values to the context.
    addItemToCart: handleAddItemToCart, // Linking update function to context
    updateItemQuantity: handleUpdateCartItemQuantity, // Linking update function to context
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

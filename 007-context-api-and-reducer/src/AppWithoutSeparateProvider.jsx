// Component is not used anywhere. Just stored as an alternate way of creating context provider.

import { useState } from 'react';

import Header from './components/Header.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import { CartContext } from './store/shopping-cart-context.jsx';

function App() {
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
    // The return value of context is an object and we are using Provider key from the object which is valid JSX
    // We need to provide initial value as well. This is the value that is passed to children. If a Provider is not used then it that case the value passed to createContext is used as default.
    // <CartContext.Provider value={{ items: [] }}>
    <CartContext.Provider value={ctxValue}>
      {/* <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      /> */}
      <Header />
      {/* Here, instead of passing handleAddItemToCart method to Shop which internally will pass the method to Product as a prop, we are simply rendering the product between the shop as children to avoid prop drilling. This is one way we can avoid prop drilling but this will cause the parent component to become bloated and the child components will be mostly wrapper components */}
      {/* <Shop onAddItemToCart={handleAddItemToCart} /> */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* <Product {...product} onAddToCart={handleAddItemToCart} /> */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;

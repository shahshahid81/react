import Header from './components/Header.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    // The return value of context is an object and we are using Provider key from the object which is valid JSX
    // We need to provide initial value as well. This is the value that is passed to children. If a Provider is not used then it that case the value passed to createContext is used as default.
    // <CartContext.Provider value={{ items: [] }}>
    <CartContextProvider>
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
    </CartContextProvider>
  );
}

export default App;

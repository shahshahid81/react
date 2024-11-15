import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/UI/Notification';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartData, sendCartData } from './store/cartActions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(state => state.ui.showCart);
  const items = useSelector(state => state.cart.items);
  const isChanged = useSelector(state => state.cart.isChanged);
  const notification = useSelector(state => state.ui.notification);

  // This example is without using redux thunk and simply dispatching action in useEffect after execution of async function
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data!',
  //       })
  //     );

  //     const response = await fetch('http://localhost:4600/cart', {
  //       method: 'PUT',
  //       body: JSON.stringify(items),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed.');
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success',
  //         message: 'Sent cart data successfully!',
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error',
  //         message: error.message || 'Sending cart data failed!',
  //       })
  //     );
  //   }
  //   )
  // }, [items, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isChanged) {
      dispatch(sendCartData(items));
    }
  }, [items, dispatch, isChanged])

  return (
    <>
      {notification && <Notification
        {...notification}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

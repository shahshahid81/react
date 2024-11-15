/*
The below function is a thunk method. Here we are getting a dispatch function as parameter which we can call whenever we want to. This function can be dispatched by calling dispatch(sendCartData(items)). Internally, we have handling where if we are returning function, redux thunk middleware will be applied.

Refer https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux for why we should use redux thunk instead of calling the dispatch method synchronously after calling the async side effect. 

In a nutshell, if we were to call the dispatch method synchronously after calling the async side effect, we would need to pass the dispatch method in the async side effect function. This helps us avoid passing dispatch and generating type for action everywhere, keeping the code more clean and maintainable.

Internally, it works like below. We have middleware for redux which has access to store and dispatch and next. We can check whether the type of action is function, if yes we pass dispatch, state and extra argument to the function so that it can be executed. Else, we use next and carry on with the execution.

//  A function that accepts a potential "extra argument" value to be injected later, and returns an instance of the thunk middleware that uses that value
function createThunkMiddleware<
  State = any,
  BasicAction extends Action = AnyAction,
  ExtraThunkArg = undefined,
>(extraArgument?: ExtraThunkArg) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  const middleware: ThunkMiddleware<State, BasicAction, ExtraThunkArg> =
    ({ dispatch, getState }) =>
      next =>
        action => {
          // The thunk middleware looks for any functions that were passed to `store.dispatch`.
          // If this "action" is really a function, call it and return the result.
          if (typeof action === 'function') {
            // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
            return action(dispatch, getState, extraArgument)
          }

          // Otherwise, pass the action down the middleware chain as usual
          return next(action)
        }
  return middleware
}
*/

import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('http://localhost:4600/cart', {
        method: 'PUT',
        body: JSON.stringify(cartData),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error.message || 'Sending cart data failed!',
        })
      );
    }
  }
}

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4600/cart');

      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }
      return await response.json();
    }

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData || []));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error.message || 'Fetching cart data failed!',
        })
      );
    }
  }
}

const redux = require('redux');

// reducer function is different then the one passed to useReducer.
// Also note that we are setting default value for state because initially it will be undefined but once set, we will get the initialized state
// function is always called with old state data and action
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = redux.createStore(counterReducer);

console.log('Initial State Value');
console.log(store.getState())

// Here, the order of subscribe and dispatch is important because if we add subscribe later, we won't be able to listen to old dispatched value.
store.subscribe(() => {
  const latestState = store.getState();
  console.log(latestState)
});

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })

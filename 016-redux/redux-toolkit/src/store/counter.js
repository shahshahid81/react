import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: false };

const counterSlice = createSlice({
  // name is uniqure identifier for store
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    // note that we are directly manipulating the state values here. Internally immerjs is used which creates a copy of object and modifies the copy instead of original data.
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // action will always recieve payload since this key is internally used by redux
      state.counter += action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});


// actions will be generated by redux which will internally create the dispatch object with type key that has a unique auto generated identifier and payload
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;

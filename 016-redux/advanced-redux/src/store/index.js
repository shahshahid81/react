import { configureStore } from '@reduxjs/toolkit';
import uiSliceReducer from './uiSlice';
import cartSliceReducer from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    ui: uiSliceReducer
  },
});

export default store;

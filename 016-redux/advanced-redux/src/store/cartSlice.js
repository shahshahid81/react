import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isChanged: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[index].quantity++;
      }
      state.isChanged = true;
    },
    removeItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity--;
        } else {
          state.items.splice(index, 1);
        }
      }
      state.isChanged = true;
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
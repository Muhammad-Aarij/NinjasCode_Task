import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("Added" + state.items.length);
      state.items.push({ ...item, quantity: item.quantity, totalPrice: item.price });
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.id !== id);
    },
    updateCart: (state, action) => {
      const { id, quantity, pricePerKg } = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = pricePerKg * quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;

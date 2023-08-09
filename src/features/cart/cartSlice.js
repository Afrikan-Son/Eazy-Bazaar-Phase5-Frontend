// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Initialize your cart items as an empty array
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // If the product already exists in the cart, increment the quantity
        existingItem.quantity += 1;
      } else {
        // If the product doesn't exist in the cart, add it with quantity = 1
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    },
    updateCartItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateCartItems } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: []
  },
  reducers: {
    addToCart(state, action) {
      state.products.push(action.payload)
    },
    removeFromCart(state, action) {
      state.products.filter(product => product._id !== action.payload._id)
    },
    changeQuantity(state, action) { },
    cleanCart(state, action) {
      state.products = { products: [] }
    },
  },
})

export const { addToCart, removeFromCart, changeQuantity, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
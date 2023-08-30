import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { api } from './api';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
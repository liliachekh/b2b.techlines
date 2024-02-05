import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import { api } from './api/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export default store
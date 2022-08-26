import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/orderPrepare/orderReducer';

export const store = configureStore({
  reducer: {
    products: searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

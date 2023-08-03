import { configureStore } from '@reduxjs/toolkit';
import closureReducer from 'features/closure/closureReducer';
import paymentReducer from 'features/payment/paymentReducer';
import customerReducer from '../features/addCustomer/customerReducer';
import orderReducer from '../features/orderPrepare/orderReducer';
import cashFundReducer from '../features/cashFund/cashFundReducer';
import staffReducer from '../features/staffLogin/staffLoginReducer';
import searchReducer from '../features/search/searchReducer';

export const store = configureStore({
  reducer: {
    products: orderReducer,
    customer: customerReducer,
    payment: paymentReducer,
    closure: closureReducer,
    cashFund: cashFundReducer,
    staff: staffReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

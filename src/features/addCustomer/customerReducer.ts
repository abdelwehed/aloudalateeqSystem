import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInterface } from 'dummyData/customers';

export interface CustomerState {
  customerInfos: CustomerInterface;
}

const initialState: CustomerState = {
  customerInfos: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    birthDate: null,
  },
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // set new customer
    setNewCustomer(state, action: PayloadAction<CustomerInterface>) {
      // ... TODO: add the user in data base

      state.customerInfos = action.payload;
    },
    // select customer
    selectCustomer(state, action: PayloadAction<CustomerInterface>) {
      state.customerInfos = action.payload;
    },
  },
});

export const { setNewCustomer, selectCustomer } = customerSlice.actions;
export default customerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { CustomerInterface } from 'dummyData/users';

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
    setNewCustomer(state) {
      state.customerInfos = initialState.customerInfos;
    },
  },
});

export const { setNewCustomer } = customerSlice.actions;
export default customerSlice.reducer;

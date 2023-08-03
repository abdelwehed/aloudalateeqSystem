import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CashFundState {
  fund: number;
}

const initialState: CashFundState = {
  fund: 0,
};

const cashFundSlice = createSlice({
  name: 'cashFund',
  initialState,
  reducers: {
    // set cash fund at the start of the day
    setCashFund(state, action: PayloadAction<number>) {
      state.fund = action.payload;
    },
    // update cash fund every time a payment / return with cash is done
    updateCashFund(state, action: PayloadAction<number>) {
      state.fund = action.payload;
    },
  },
});

export const { setCashFund, updateCashFund } = cashFundSlice.actions;
export default cashFundSlice.reducer;

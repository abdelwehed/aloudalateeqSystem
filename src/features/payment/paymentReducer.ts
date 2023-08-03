import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * types des paiement dans la caisse
 *   - carte
 *   - avance
 *   - avoir
 *   - credit
 *   - points
 *   - bonus
 */

/**
 * types des paiement
 *   - carte
 *   - espéces
 *   - chéque
 *   - chéque différé
 */
export interface PaymentState {
  payment: any;
  totalOrder: number;
  remaining: number | null;
  change: number;
}

const initialState: PaymentState = {
  payment: null,
  totalOrder: 0,
  remaining: null,
  change: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // set payment
    setPayment(state) {
      state.payment = initialState;
    },
    // set total order
    setTotalOrder(state, action: PayloadAction<number>) {
      state.totalOrder = action.payload;
    },
    // set remaining
    setRemaining(state, action: PayloadAction<number>) {
      state.remaining = action.payload;
    },
    // set change
    setChange(state, action: PayloadAction<number>) {
      state.change = action.payload;
    },
  },
});

export const { setPayment, setTotalOrder, setRemaining, setChange } =
  paymentSlice.actions;
export default paymentSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClosureState {
  closure: any;
}

const initialState: ClosureState = {
  closure: null,
};

const closureSlice = createSlice({
  name: 'closure',
  initialState,
  reducers: {
    // set closure
    setClosure(state) {
      state.closure = initialState;
    },
  },
});

export const { setClosure } = closureSlice.actions;
export default closureSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffInterface } from 'dummyData/staff';

export interface StaffState {
  staffInfos: StaffInterface;
}

const initialState: StaffState = {
  staffInfos: {
    address: '',
    mobileNumber: null,
    email: null,
    birthDate: null,
    relatedBranch: null,
  },
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // set staff data after login
    setStaff(state, action: PayloadAction<StaffInterface>) {
      state.staffInfos = action.payload;
    },
  },
});

export const { setStaff } = staffSlice.actions;
export default staffSlice.reducer;

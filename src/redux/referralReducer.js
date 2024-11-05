import { createSlice } from "@reduxjs/toolkit";

const referralSlice = createSlice({
  name: "referrals",
  initialState: [],
  reducers: {
    setReferrals: (state, action) => action.payload,
    addReferral: (state, action) => [...state, action.payload],
    updateReferral: (state, action) =>
      state.map((referral) =>
        referral.id === action.payload.id ? action.payload : referral
      ),
    deleteReferral: (state, action) =>
      state.filter((referral) => referral.id !== action.payload),
  },
});

export const { setReferrals, addReferral, updateReferral, deleteReferral } =
  referralSlice.actions;
export default referralSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import referralReducer from "./referralReducer"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    referrals: referralReducer,
  },
});

export default store;

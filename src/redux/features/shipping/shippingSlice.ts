import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  ShippingCostCreateError: string,
  ShippingCostUpdateError: string,
}

const initialState: TInitialState = {
  ShippingCostCreateError: "",
  ShippingCostUpdateError: "",
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    SetShippingCostCreateError: (state, action) => {
      state.ShippingCostCreateError = action.payload;
    },
    SetShippingCostUpdateError: (state, action) => {
      state.ShippingCostUpdateError = action.payload;
    },
  },
});

export const {
  SetShippingCostCreateError,
  SetShippingCostUpdateError,
} = shippingSlice.actions;

const shippingSliceReducer = shippingSlice.reducer;
export default shippingSliceReducer;

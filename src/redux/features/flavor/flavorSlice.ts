import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FlavorCreateError: "",
  FlavorUpdateError: "",
  flavorOptions: []
};

const flavorSlice = createSlice({
  name: "flavor",
  initialState,
  reducers: {
    SetFlavorCreateError: (state, action) => {
      state.FlavorCreateError = action.payload;
    },
    SetFlavorUpdateError: (state, action) => {
      state.FlavorUpdateError = action.payload;
    },
    SetFlavorOptions: (state, action) => {
      state.flavorOptions = action.payload;
    }
  },
});

export const {
  SetFlavorCreateError,
  SetFlavorUpdateError,
  SetFlavorOptions
} = flavorSlice.actions;

const flavorSliceReducer = flavorSlice.reducer;
export default flavorSliceReducer;

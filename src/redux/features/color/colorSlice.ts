import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ColorCreateError: "",
  ColorUpdateError: "",
  colorOptions: []
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    SetColorCreateError: (state, action) => {
      state.ColorCreateError = action.payload;
    },
    SetColorUpdateError: (state, action) => {
      state.ColorUpdateError = action.payload;
    },
    SetColorOptions: (state, action) => {
      state.colorOptions = action.payload;
    }
  },
});

export const {
  SetColorCreateError,
  SetColorUpdateError,
  SetColorOptions
} = colorSlice.actions;

const colorSliceSliceReducer = colorSlice.reducer;
export default colorSliceSliceReducer;

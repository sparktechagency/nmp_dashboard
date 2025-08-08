import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SizeCreateError: "",
  SizeUpdateError: "",
  sizeOptions: []
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    SetSizeCreateError: (state, action) => {
      state.SizeCreateError = action.payload;
    },
    SetSizeUpdateError: (state, action) => {
      state.SizeUpdateError = action.payload;
    },
    SetSizeOptions: (state, action) => {
      state.sizeOptions = action.payload;
    }
  },
});

export const {
  SetSizeCreateError,
  SetSizeUpdateError,
  SetSizeOptions
} = sizeSlice.actions;

const sizeSliceReducer = sizeSlice.reducer;
export default sizeSliceReducer;

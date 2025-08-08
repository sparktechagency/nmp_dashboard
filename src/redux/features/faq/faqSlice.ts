import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CreateFaqError: "",
  EditFaqError: ""
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    SetCreateFaqError: (state, action) => {
      state.CreateFaqError = action.payload;
    },
    SetEditFaqError: (state, action) => {
      state.EditFaqError = action.payload;
    },
  },
});

export const { SetCreateFaqError, SetEditFaqError } = faqSlice.actions;

const faqSliceReducer = faqSlice.reducer;
export default faqSliceReducer;

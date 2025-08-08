import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryCreateError: "",
  CategoryUpdateError: "",
  categoryOptions: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    SetCategoryCreateError: (state, action) => {
      state.CategoryCreateError = action.payload;
    },
    SetCategoryUpdateError: (state, action) => {
      state.CategoryUpdateError = action.payload;
    },
    SetCategoryOptions: (state, action) => {
      state.categoryOptions = action.payload;
    }
  },
});

export const {
  SetCategoryCreateError,
  SetCategoryUpdateError,
  SetCategoryOptions
} = categorySlice.actions;

const categorySliceReducer = categorySlice.reducer;
export default categorySliceReducer;

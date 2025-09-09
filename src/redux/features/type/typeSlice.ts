import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  TypeCreateError: string,
  TypeUpdateError: string,
  typeOptions: {label: string; value: string;}[];
}

const initialState: TInitialState = {
  TypeCreateError: "",
  TypeUpdateError: "",
  typeOptions: []
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    SetTypeCreateError: (state, action) => {
      state.TypeCreateError = action.payload;
    },
    SetTypeUpdateError: (state, action) => {
      state.TypeUpdateError = action.payload;
    },
    SetTypeOptions: (state, action) => {
      state.typeOptions = action.payload;
    }
  },
});

export const {
  SetTypeCreateError,
  SetTypeUpdateError,
  SetTypeOptions
} = typeSlice.actions;

const typeSliceReducer = typeSlice.reducer;
export default typeSliceReducer;

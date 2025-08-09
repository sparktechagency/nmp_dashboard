import { createSlice } from "@reduxjs/toolkit";
import type { TProfile } from "../../../types/user.type";


type TInitialState = {
  CreateError: string;
  user: TProfile | null;
}

const initialState: TInitialState = {
  CreateError: "",
  user: {
    "fullName": "Admin Admin",
    "email": "admin@gmail.com",
    "phone": "01793837035",
    "profileImg": ""
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  SetUser
} = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;

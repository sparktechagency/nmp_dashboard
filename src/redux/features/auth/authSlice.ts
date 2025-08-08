import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ForgotError: "",
    VerifyOtpError: "",
    ResetPasswordError: "",
    LoginError: "",
    RegisterError: "",
    ChangePasswordError: "",
    ProfileError: "This is error"
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetForgotError : (state, action)=>{
            state.ForgotError=action.payload;
        },
        SetVerifyOtpError : (state, action)=>{
            state.VerifyOtpError=action.payload;
        },
        SetResetPasswordError : (state, action)=>{
            state.ResetPasswordError=action.payload;
        },
        SetLoginError : (state, action)=>{
            state.LoginError=action.payload;
        },
        SetRegisterError : (state, action)=>{
            state.RegisterError=action.payload;
        },
        SetChangePasswordError : (state, action)=>{
            state.ChangePasswordError=action.payload;
        },
        SetProfileError : (state, action)=>{
            state.ProfileError=action.payload;
        }
    }
})



export const { SetForgotError, SetVerifyOtpError, SetResetPasswordError, SetLoginError, SetRegisterError, SetChangePasswordError, SetProfileError} = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
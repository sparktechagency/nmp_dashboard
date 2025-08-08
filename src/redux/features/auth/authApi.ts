/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant.ts";
import {
  setEmail,
  setOtp,
  setToken,
} from "../../../helper/SessionHelper.ts";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.ts";
import { apiSlice } from "../api/apiSlice.ts";
import {
  SetChangePasswordError,
  SetForgotError,
  SetLoginError,
  SetResetPasswordError,
  SetVerifyOtpError,
} from "./authSlice.ts";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login-admin",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
            localStorage.clear();
            setToken(token);
            SuccessToast("Login Success");
            setTimeout(() => {
              window.location.href = "/";
            }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetLoginError("Something Went Wrong"));
          }
          else {
            dispatch(SetLoginError(message));
          }
        }
      },
    }),
    forgotPasswordSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetForgotError("Something Went Wrong"));
          }
          else {
            dispatch(SetForgotError(message));
          }
        }
      },
    }),
    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setOtp(arg.otp)
          SuccessToast("Otp is verified successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetVerifyOtpError("Something Went Wrong"));
          }
          else {
            dispatch(SetVerifyOtpError(message));
          }
        }
      },
    }),
    forgotPasswordResendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
             ErrorToast(message);
          }
        }
      },
    }),
    forgotPasswordReset: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-pass-create-new-pass`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is reset successfully!");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/auth/signin";
          }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetResetPasswordError("Something Went Wrong"));
          }
          else {
            dispatch(SetResetPasswordError(message));
          }
        }
      },
    }),
    changeStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/auth/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.users, TagTypes.admins];
        }
        return [];
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Update Success");
        } catch (err:any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
             ErrorToast(message);
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is updated successfully");
          setTimeout(() => {
            localStorage.clear()
            window.location.href = "/auth/signin";
          }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetChangePasswordError("Something Went Wrong"));
          }
          else {
            dispatch(SetChangePasswordError(message))
          }
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordSendOtpMutation,
  useForgotPasswordResendOtpMutation,
  useForgotPasswordVerifyOtpMutation,
  useForgotPasswordResetMutation,
  useChangeStatusMutation,
  useChangePasswordMutation,
} = authApi;

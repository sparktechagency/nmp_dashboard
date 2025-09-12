/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetUser } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/user/get-users",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.users],
    }),
    getExportUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/user/get-export-users",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.users],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.profile],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          dispatch(SetUser(data))
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
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-my-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.profile];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Profile is updated successfully");
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
    updateProfileImg: builder.mutation({
      query: (data) => ({
        url: `/user/update-profile-img`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.profile];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Profile Image is updated success");
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
  }),
});

export const { useGetUsersQuery, useGetExportUsersQuery, useGetMyProfileQuery, useUpdateProfileMutation, useUpdateProfileImgMutation } = userApi;

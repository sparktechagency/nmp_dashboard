/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IColor } from "../../../types/color.type";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetColorCreateError, SetColorOptions, SetColorUpdateError } from "./colorSlice";

export const colorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
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
          url: "/color/get-colors",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.colors],
    }),
    getColorDropDown: builder.query({
      query: () => ({
        url: "/color/get-color-drop-down",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.colorDropDown],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          const options = data?.map((c: IColor) => ({
            value: c._id,
            label: c.name,
          }))
          dispatch(SetColorOptions(options))
        } catch {
          ErrorToast("Something Went Wrong");
        }
      },
    }),
    createColor: builder.mutation({
      query: (data) => ({
        url: "/color/create-color",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors, TagTypes.colorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Color is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetColorCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetColorCreateError(message));
          }
        }
      },
    }),
    updateColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/update-color/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors, TagTypes.colorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Color is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetColorUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetColorUpdateError(message));
          }
        }
      },
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete-color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors, TagTypes.colorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Color is deleted successfully");
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

export const { useGetColorsQuery, useGetColorDropDownQuery, useCreateColorMutation, useUpdateColorMutation, useDeleteColorMutation } = colorApi;

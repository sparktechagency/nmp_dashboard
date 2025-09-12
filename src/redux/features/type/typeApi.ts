/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IFlavor } from "../../../types/flavor.type";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetTypeCreateError, SetTypeOptions, SetTypeUpdateError } from "./typeSlice";

export const typeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query({
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
          url: "/type/get-types",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.types],
    }),
    getExportTypes: builder.query({
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
          url: "/type/get-export-types",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.exportTypes],
    }),
    getTypeDropDown: builder.query({
      query: () => ({
        url: "/type/get-type-drop-down",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.typeDropDown],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          const options = data?.map((f: IFlavor) => ({
            value: f._id,
            label: f.name,
          }))
          dispatch(SetTypeOptions(options))
        } catch {
          ErrorToast("Something Went Wrong");
        }
      },
    }),
    createType: builder.mutation({
      query: (data) => ({
        url: "/type/create-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.types, TagTypes.exportTypes, TagTypes.typeDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Type is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetTypeCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetTypeCreateError(message));
          }
        }
      },
    }),
    updateType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/type/update-type/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.types, TagTypes.exportTypes, TagTypes.typeDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Type is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetTypeUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetTypeUpdateError(message));
          }
        }
      },
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        url: `/type/delete-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
           return [TagTypes.types, TagTypes.exportTypes, TagTypes.typeDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Type is deleted successfully");
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

export const { useGetTypesQuery, useGetExportTypesQuery, useGetTypeDropDownQuery, useCreateTypeMutation, useDeleteTypeMutation, useUpdateTypeMutation } = typeApi;

/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IFlavor } from "../../../types/flavor.type";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetFlavorCreateError, SetFlavorOptions, SetFlavorUpdateError } from "./flavorSlice";

export const flavorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlavors: builder.query({
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
          url: "/flavor/get-flavors",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.flavors],
    }),
    getExportFlavors: builder.query({
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
          url: "/flavor/get-export-flavors",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.exportFlavors],
    }),
    getFlavorDropDown: builder.query({
      query: (typeId) => ({
        url: `/flavor/get-flavor-drop-down/${typeId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.flavorDropDown],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          const options = data?.map((f: IFlavor) => ({
            value: f._id,
            label: f.name,
          }))
          dispatch(SetFlavorOptions(options))
        } catch {
          ErrorToast("Something Went Wrong");
        }
      },
    }),
    createFlavor: builder.mutation({
      query: (data) => ({
        url: "/flavor/create-flavor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.flavors, TagTypes.exportFlavors, TagTypes.flavorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Flavor is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetFlavorCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetFlavorCreateError(message));
          }
        }
      },
    }),
    updateFlavor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flavor/update-flavor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.flavors, TagTypes.exportFlavors, TagTypes.flavorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Flavor is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetFlavorUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetFlavorUpdateError(message));
          }
        }
      },
    }),
    deleteFlavor: builder.mutation({
      query: (id) => ({
        url: `/flavor/delete-flavor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.flavors, TagTypes.exportFlavors, TagTypes.flavorDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Flavor is deleted successfully");
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

export const { useGetFlavorsQuery, useGetExportFlavorsQuery, useGetFlavorDropDownQuery, useCreateFlavorMutation, useDeleteFlavorMutation, useUpdateFlavorMutation } = flavorApi;

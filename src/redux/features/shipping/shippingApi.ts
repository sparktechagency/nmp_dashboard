/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetShippingCostCreateError, SetShippingCostUpdateError } from "./shippingSlice";

export const shippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShippingCosts: builder.query({
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
          url: "/shipping-cost/get-all-shipping-costs",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.shippingCosts],
    }),
    createShippingCost: builder.mutation({
      query: (data) => ({
        url: "/shipping-cost/create-shipping-cost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.shippingCosts];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Shipping Cost is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetShippingCostCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetShippingCostCreateError(message));
          }
        }
      },
    }),
    updateShippingCost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shipping-cost/update-shipping-cost/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.shippingCosts];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Shipping Cost is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetShippingCostUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetShippingCostUpdateError(message));
          }
        }
      },
    }),
    deleteShippingCost: builder.mutation({
      query: (id) => ({
        url: `/shipping-cost/delete-shipping-cost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
            return [TagTypes.shippingCosts];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Shipping Cost is deleted successfully");
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

export const { useGetShippingCostsQuery, useCreateShippingCostMutation, useDeleteShippingCostMutation, useUpdateShippingCostMutation } = shippingApi;

/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
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
          url: "/product/get-products",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.products],
    }),
    getFeatureProducts: builder.query({
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
          url: "/product/get-feature-products",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.featureProducts],
    }),
    getBestSellerProducts: builder.query({
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
          url: "/product/get-best-seller-products",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.bestSellerProducts],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.products];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product is created successfully");
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
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.product, id: arg },
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.products, TagTypes.featureProducts, { type: TagTypes.product, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
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
    updateProductImg: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product-img/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.products, TagTypes.featureProducts, { type: TagTypes.product, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Update Success");
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.products];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product is deleted successfully");
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

export const { useGetProductsQuery, useGetFeatureProductsQuery, useGetBestSellerProductsQuery, useGetSingleProductQuery, useCreateProductMutation, useUpdateProductImgMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi;

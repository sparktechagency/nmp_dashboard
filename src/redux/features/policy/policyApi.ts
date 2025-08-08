/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";

export type TPolicyType = "privacy-policy" | "about-us" |  "terms-condition" | "help";


export const policyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPolicyByType: builder.query({
      query: (type:TPolicyType) => {
        return {
          url: `/policy/get-policy-by-type/${type}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.policy, id: arg },
      ],
    }),
    createUpdatePolicy: builder.mutation({
      query: (data) => ({
        url: `/policy/create-update-policy`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [{ type: TagTypes.policy, id: arg.type }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Update Success`);
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
    })
  }),
});

export const {
  useGetPolicyByTypeQuery,
  useCreateUpdatePolicyMutation
} = policyApi;

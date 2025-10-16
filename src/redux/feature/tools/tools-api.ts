import { DataConstant } from "@/constants/data.constant";
import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const ToolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProgress: builder.query({
      query: () => ({
        // get user progress under the Kurated Storylining
        url: `/webapis/user/userProgress/${DataConstant.KURATED_COURSE_ID}`,
      }),
      providesTags: [TAGS.userProgress],
    }),
    getActiveSubscribe: builder.query({
      query: () => ({
        // get user progress under the Kurated Storylining
        url: `/webapis/user/activeSubscriptions?courseId=${DataConstant.KURATED_COURSE_ID}`,
      }),

    }),
    makePaymentForCourse: builder.mutation({
      query: (data) => ({
        // get user progress under the Kurated Storylining
        url: `/webapis/payments/createPaymentLinkForCourse`,
        method: "PUT",
        body:data
      }),

    }),
    getPaymentHistory: builder.query({
      query: () => ({
        // get user progress under the Kurated Storylining
        url: `/webapis/payments/paymentHistory`,
        method: "GET",
        // body:data
      }),

    }),
  }),
});

export const { useGetUserProgressQuery,useGetActiveSubscribeQuery,useMakePaymentForCourseMutation,useGetPaymentHistoryQuery } = ToolsApi;

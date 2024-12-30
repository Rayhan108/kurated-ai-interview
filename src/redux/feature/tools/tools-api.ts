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
  }),
});

export const { useGetUserProgressQuery } = ToolsApi;

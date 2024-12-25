import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChaptersWithLessons: builder.query({
      query: () => ({
        url: `/webapis/interview/allChaptersWithLessons`,
      }),
      providesTags: [TAGS.lessonContent],
    }),

    getSingleLesson: builder.query({
      query: (id) => ({
        url: `/webapis/interview/chapterLesson/${id}`,
      }),
    }),

    markLessonAsCompleted: builder.mutation({
      query: (id) => ({
        url: `/webapis/interview/markChapterLessonAsCompleted/${id}`,
        method: "POST",
      }),
      invalidatesTags: [TAGS.userProgress],
    }),
  }),
});

export const {
  useGetAllChaptersWithLessonsQuery,
  useGetSingleLessonQuery,
  useMarkLessonAsCompletedMutation,
} = lessonApi;

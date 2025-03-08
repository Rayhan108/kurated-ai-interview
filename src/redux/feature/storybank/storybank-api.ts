import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const storyBankApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStorybankRole: builder.query({
      query: () => ({
        url: `/webapis/storybank/roles/all`,
      }),
      providesTags: [TAGS.storyBankRole],
    }),

    getSingleStorybankRole: builder.query({
      query: (id) => ({
        url: `/webapis/storybank/roles/${id}`,
      }),
    }),

    getParsedResume: builder.mutation({
      query: (pdfFile) => {
        const formData = new FormData();
        formData.append("file", pdfFile);

        return {
          url: "/webapis/storybank/parse-resume/extract-work-experience",
          method: "POST",
          body: formData,
        };
      },
    }),

    getTopicRelevancy: builder.query({
      query: (data) => {
        const dto = {
          role: data.role,
          roleTopics: data.roleTopics,
          experience: data.experience,
        };
        return {
          url: `/webapis/storybank/role-topics-relevancy-for-experience`,
          method: "POST",
          body: dto,
        };
      },
    }),

    generateStoryInHears: builder.query({
      query: (data) => {
        const dto = {
          role: data.role,
          roleTopic: data.roleTopic,
          experience: data.experience,
        };
        return {
          url: `/webapis/storybank/generate-story-in-hears`,
          method: "POST",
          body: dto,
        };
      },
    }),

    reGenerateStoryInHears: builder.mutation({
      query: (data) => {
        const dto = {
          role: data.role,
          roleTopic: data.roleTopic,
          storyInHearsFormat: data.storyInHearsFormat,
          relevance: data.relevance,
          context: data.context,
        };
        return {
          url: `/webapis/storybank/enhance-story-in-hears`,
          method: "POST",
          body: dto,
        };
      },
    }),

    saveStory: builder.mutation({
      query: (data) => {
        return {
          url: `/webapis/storybank/save-story`,
          method: "POST",
          body: [data],
        };
      },
      invalidatesTags: [TAGS.interviewMatrix, TAGS.portfolioExperience],
    }),

    getSavedStory: builder.query({
      query: () => {
        return {
          url: `/webapis/storybank/saved-stories/role`,
        };
      },
      providesTags: [TAGS.interviewMatrix],
    }),

    getPortfolioExperience: builder.query({
      query: () => {
        return {
          url: `/webapis/storybank/saved-experiences`,
        };
      },
      providesTags: [TAGS.portfolioExperience],
    }),

    ownerShip: builder.mutation({
      query: (body) => ({
        url: '/role-topics-experience-relevancy-percentage',
        method: 'POST',
        body,
      }),
    }),
    
    getSpecificSavedStory: builder.query({
      query: (id) => ({
        url: `/webapis/storybank/saved-stories/${id}`,
        method: "GET",
      }),
    })
    

  }),
});

export const {
  useGetAllStorybankRoleQuery,
  useGetSingleStorybankRoleQuery,
  useGetParsedResumeMutation,
  useGetTopicRelevancyQuery,
  useGenerateStoryInHearsQuery,
  useReGenerateStoryInHearsMutation,
  useSaveStoryMutation,
  useGetSavedStoryQuery,
  useGetPortfolioExperienceQuery,
  useOwnerShipMutation,
  useGetSpecificSavedStoryQuery
} = storyBankApi;

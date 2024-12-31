import { baseApi } from "@/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/webapis/others/uploadImage`,
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/webapis/user/userProfile`,
        method: "PUT",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/webapis/user/changePassword`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;

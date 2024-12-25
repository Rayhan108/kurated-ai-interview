import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";
import { IResponse } from "@/types/response-type";
import { ILoggedInUser } from "./auth.dto";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-actor",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logIn: builder.mutation<
      IResponse<{ id: string }>,
      { email: string; password: string }
    >({
      query: (userInfo) => ({
        url: "/webapis/auth/loginViaEmailAndPassword",
        method: "POST",
        headers: {
          email: userInfo.email,
          password: userInfo.password,
        },
      }),
    }),
    loggedInUser: builder.query<IResponse<ILoggedInUser>, void>({
      query: () => ({
        url: "/webapis/user/userProfile",
      }),
      providesTags: [TAGS.loggedInUser],
    }),

    changedPassword: builder.mutation({
      query: (password) => ({
        url: "/auth/change-password",
        method: "POST",
        body: password,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (password) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: password,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, headers }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          ...headers,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useLoggedInUserQuery,
  useChangedPasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;

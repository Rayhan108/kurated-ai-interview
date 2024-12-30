import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => {
        const dto = {
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          name: `${userInfo.firstName} ${userInfo.lastName}`,
          role: "N/A",
          age: 10,
          company: "N/A",
          location: "N/A",
          otp: userInfo.otp,
        };

        return {
          url: "/webapis/auth/interviewApp/signUpViaEmail",
          method: "POST",
          body: dto,
          headers: {
            email: userInfo.email,
            password: userInfo.password,
          },
        };
      },
    }),
    logIn: builder.mutation({
      query: (userInfo) => ({
        url: "/webapis/auth/interviewApp/loginViaEmailAndPassword",
        method: "POST",
        headers: {
          email: userInfo.email,
          password: userInfo.password,
        },
      }),
    }),
    loggedInUser: builder.query({
      query: () => ({
        url: "/webapis/user/userProfile",
      }),
      providesTags: [TAGS.loggedInUser],
    }),

    checkEmailExistence: builder.mutation({
      query: (email) => ({
        url: `/webapis/auth/checkForEmailExistence`,
        method: "POST",
        headers: {
          email: email,
        },
      }),
    }),

    sendOtp: builder.mutation({
      query: (email) => ({
        url: `/webapis/user/sendOTPOnEmail`,
        method: "POST",
        body: {
          email: email,
        },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/webapis/auth/logout`,
        method: "PATCH",
      }),
    }),

    // changedPassword: builder.mutation({
    //   query: (password) => ({
    //     url: "/auth/change-password",
    //     method: "POST",
    //     body: password,
    //   }),
    // }),
    // forgetPassword: builder.mutation({
    //   query: (password) => ({
    //     url: "/auth/forget-password",
    //     method: "POST",
    //     body: password,
    //   }),
    // }),
    // resetPassword: builder.mutation({
    //   query: ({ data, headers }) => ({
    //     url: "/auth/reset-password",
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       ...headers,
    //     },
    //   }),
    // }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useLoggedInUserQuery,
  useCheckEmailExistenceMutation,
  useSendOtpMutation,
  useLogoutMutation,
} = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAGS } from "../tag";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://betatest.kurated.ai/userAppApis",
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: Object.values(TAGS) as string[],
  endpoints: () => ({}),
});

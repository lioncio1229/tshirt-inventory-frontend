import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "grantAdvanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7297",
    prepareHeaders: headers => {
      
      const rawToken = localStorage.getItem("token") || null;

      if (rawToken !== null) {
        headers.append("Authorization", `Bearer ${rawToken}`);
      }
      else {
        headers.append("Access-Control-Allow-Origin", "*");
      }

      return headers;
    }
  }),
  endpoints: () => ({}),
});
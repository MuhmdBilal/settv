import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URI } from "../config";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URI}/`}),
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: () => `api/v1/product`,
      }),
    }),
  });


  export const { useGetAllProductsQuery } = productsApi;
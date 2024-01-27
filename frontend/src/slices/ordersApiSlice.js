import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constant";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateOrdersMutation } = orderApiSlice;

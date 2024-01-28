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
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrdersMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
} = orderApiSlice;

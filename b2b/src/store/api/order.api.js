import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `orders/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Orders', id })),
            { type: 'Orders', id: 'LIST' },
          ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }, { type: 'Cart', id: 'LIST' }]
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `orders/all`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Orders', id })),
            { type: 'Orders', id: 'LIST' },
          ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrder: builder.query({
      query: (orderNo) => `orders/${orderNo}`,
      providesTags: (id) => [{ type: 'Orders', id }]
    })
  })
})

export const { useGetOrdersQuery, useSetOrderMutation, useDeleteOrderMutation, useGetAllOrdersQuery, useGetOrderQuery } = orderApi;
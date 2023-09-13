import { api } from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `cart/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.products.map(({ id }) => ({ type: 'Cart', id })),
            { type: 'Cart', id: 'LIST' },
          ]
          : 
          [{ type: 'Cart', id: 'LIST' }],
    }),
    setCart: builder.mutation({
      query: (body) => ({
        url: `cart`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
  })
})

export const { useGetCartQuery, useSetCartMutation, useDeleteFromCartMutation } = cartApi;
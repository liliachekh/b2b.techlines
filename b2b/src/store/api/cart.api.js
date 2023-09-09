import { api } from "./api";
import { headers } from "../../utils/vars";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `cart/`,
        method: 'GET',
        headers: headers(),
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.products.map(({ id }) => ({ type: 'Cart', id })),
            { type: 'Cart', id: 'LIST' },
          ]
          : [{ type: 'Cart', id: 'LIST' }],
    }),
    setCart: builder.mutation({
      query: (body) => ({
        url: `cart`,
        method: 'PUT',
        headers: headers(),
        body: body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
        headers: headers(),
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
  })
})

export const { useGetCartQuery, useSetCartMutation, useDeleteFromCartMutation } = cartApi;
import { api } from "./api";
// =====================
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY1M2ExMWY5ZDRjMDAxZTYxNDZlZCIsImZpcnN0TmFtZSI6IkFudG9uIiwibGFzdE5hbWUiOiJNeWtoYWlsaWNoZW5rbyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MzU2OTY2NywiZXhwIjoxNjkzNjA1NjY3fQ.L80qt8l0aVxpVMqLUk1RvVMub3CuPh-ZYgj0DfGaKVo';
// =====================
export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `cart/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
        // url: `cart/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
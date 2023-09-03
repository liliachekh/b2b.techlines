import { api } from "./api";
// =====================
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY1M2ExMWY5ZDRjMDAxZTYxNDZlZCIsImZpcnN0TmFtZSI6IkFudG9uIiwibGFzdE5hbWUiOiJNeWtoYWlsaWNoZW5rbyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Mzc1MzYzOCwiZXhwIjoxNjkzNzg5NjM4fQ.ELSJ4mDt-RKZQH2LGbQ0Cq1V5VJKYYyNO_R7zXp2cmc';
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
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),
  })
})

export const { useGetCartQuery, useSetCartMutation, useDeleteFromCartMutation } = cartApi;
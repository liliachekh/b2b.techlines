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
    // setOrder: builder.mutation({
    //   query: (body) => ({
    //     url: `orders`,
    //     method: 'POST',
    //     headers: headers(),
    //     body: body,
    //   }),
    //   invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    // }),
  })
})

export const { useGetOrdersQuery } = orderApi;
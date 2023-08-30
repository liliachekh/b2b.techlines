import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/vars'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Products', 'Cart'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (queryString) => `products/filter${queryString}`,
      providesTags: (result) =>
        result
          ? [
            ...result.products.map(({ id }) => ({ type: 'Products', id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addToCart: build.mutation({
      query: (id, body) => ({
        url: `cart/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST'}]
    }),
    deleteFromCart: build.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST'}]
    }),
  })
})

export const { useGetProductsQuery, useAddToCartMutation, useDeleteFromCartMutation } = api;
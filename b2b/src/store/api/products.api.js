import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryString) => `products/filter${queryString}`,
      providesTags: (result) =>
        result
          ? [
            ...result.products.map(({ id }) => ({ type: 'Products', id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: builder.query({
      query: (itemNo) => `products/${itemNo}`,
    }),
  })
})

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
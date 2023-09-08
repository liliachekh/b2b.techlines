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
      query: (productUrl) => `products/${productUrl}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  })
})

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/vars'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Products', 'Product', 'Cart', 'Customers', 'Orders', 'Filters'],
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: () => ({}),
})

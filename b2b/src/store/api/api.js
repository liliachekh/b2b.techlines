import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/vars'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Products', 'Cart','Customers'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
})

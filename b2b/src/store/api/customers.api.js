import { api } from "./api";

export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    logIn: builder.mutation({
      query: (body) => ({
        url: 'customers/login',
        method: 'POST',
        body: body
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    })
  })
})

export const { useLogInMutation} = customersApi;

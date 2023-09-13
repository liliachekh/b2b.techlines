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
    }),
    getCustomer: builder.query({
      query: () => ({
        url: 'customers/customer',
        method: 'GET',
      }),
    }),
    getLoggedIn: builder.query({
      query:() => ({
        url: 'customers/loggedIn',
        method: 'GET',
    })
  })
}),
})

export const { useLogInMutation, useGetCustomerQuery, useGetLoggedInQuery } = customersApi
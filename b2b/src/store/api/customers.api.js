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
    logOut: builder.mutation({
      query: () => ({
        url: 'customers/logout',
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    getCustomer: builder.query({
      query: () => ({
        url: 'customers/customer',
        method: 'GET',
      }),
    }),
    changeAccount: builder.mutation({
      query: (body) => ({
        url: 'customers/',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: 'customers/password',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    getLoggedIn: builder.query({
      query: () => ({
        url: 'customers/loggedIn',
        method: 'GET',
      })
    })
  })
})

export const { useLogInMutation, useLogOutMutation, useGetCustomerQuery, useChangeAccountMutation, useChangePasswordMutation, useGetLoggedInQuery } = customersApi;
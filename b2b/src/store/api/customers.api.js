import { api } from "./api";


export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (body) => ({
        url: 'customers/login',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Customers']
      // invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'customers/logout',
        method: 'GET',
      }),
      invalidatesTags: ['Customers']
      // invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    getCustomer: builder.query({
      query: () => ({
        url: 'customers/customer',
        method: 'GET',
      }),
      providesTags: ['Customers'],
    }),
    changeAccount: builder.mutation({
      query: (body) => ({
        url: 'customers/',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Customers']
      // invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: 'customers/password',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Customers']
      // invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    getLoggedIn: builder.query({
      query: () => ({
        url: 'customers/loggedIn',
        method: 'GET',
      })
    }),
    requestResetPassword: builder.mutation({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body: body
      }),
      // invalidatesTags: ['Customers']
    }),
    verifyUrl: builder.query({
      query: () => ({
        url: 'password-reset/new-password/:token/:id',
        method: 'GET',
      })
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: 'password-reset/new-password/:token/:id',
        method: 'POST',
        body: body
      }),
    })
  })
})

export const { useLogInMutation, useLogOutMutation, useGetCustomerQuery, useChangeAccountMutation, useChangePasswordMutation, useGetLoggedInQuery, useRequestResetPasswordMutation, useVerifyUrlQuery ,useResetPasswordMutation } = customersApi;
import { api } from "./api";
import { headers } from "../../utils/vars";

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
        headers: headers(),
      }),
    }),
    changeAccount: builder.mutation({
      query: (body) => ({
        url: 'customers/',
        method: 'PUT',
        headers: headers(),
        body: body
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: 'customers/password',
        method: 'PUT',
        headers: headers(),
        body: body
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }]
    }),
  })
})

export const { useLogInMutation, useGetCustomerQuery, useChangeAccountMutation, useChangePasswordMutation } = customersApi;
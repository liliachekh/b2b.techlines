import { api } from "./api";

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: () => ({
        url: `filters/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Filters', id })),
            { type: 'Filters', id: 'LIST' },
          ]
          : [{ type: 'Filters', id: 'LIST' }],
    }),
    deleteFilters: builder.mutation({
      query: (body) => ({
        url: `filters/`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: [{ type: 'Filters', id: 'LIST' }]
    }),
    setFilter: builder.mutation({
      query: (body) => ({
        url: `filters/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Filters', id: 'LIST' }]
    }),
    updateFilter: builder.mutation({
      query: ({id, body}) => ({
        url: `filters/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: [{ type: 'Filters', id: 'LIST' }]
    }),
  })
})

export const { useGetFiltersQuery, useDeleteFiltersMutation, useSetFilterMutation, useUpdateFilterMutation } = filterApi;
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
  })
})

export const { useGetFiltersQuery } = filterApi;
import { api } from "./api";
import { headers } from "../../utils/vars";

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: () => ({
        url: `filters/`,
        method: 'GET',
        headers: headers(),
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
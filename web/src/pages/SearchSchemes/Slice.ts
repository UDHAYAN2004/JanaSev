import { emptySplitApi } from "../api/apiSlice";

const SearchSchemesApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunity: builder.query<any, void>({
      query: () => ({
        url: "/schemes/get-community",
        method: "GET",
      }),
    }),

    getCategory: builder.query<any, void>({
      query: () => ({
        url: "/schemes/get-categories",
        method: "GET",
      }),
    }),

    getState: builder.query<any, void>({
      query: () => ({
        url: "/schemes/get-states",
        method: "GET",
      }),
    }),

    getScheme: builder.query<
      any,
      Partial<{ page:number,state: string; category: string; community: string }>
    >({
      query: ({ page=1, state = "", category = "", community = "" }) => ({
        url: `/schemes/get-scheme/filter`,
        method: "GET",
        params: {page, state, category, community },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCommunityQuery,
  useGetCategoryQuery,
  useGetStateQuery,
  useLazyGetSchemeQuery,
} = SearchSchemesApi;

import { emptySplitApi } from ".";

const analyticsApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: () => "api/v1/analytics/summary"
        }),
        getTopProducts: builder.query({
            query: () => "api/v1/analytics/topproducts"
        })
    })
});

export const {
    useGetSummaryQuery,
    useGetTopProductsQuery,
} = analyticsApi;
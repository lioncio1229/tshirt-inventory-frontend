import { emptySplitApi } from ".";

const tshirtManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getShirts: builder.query({
            query: (model) => `api/v1/tshirt/q?skipRows=${model.pageIndex}&numberOfItems=${model.rowsPerPage}`
        }),
    })
});

export const {
    useGetShirtsQuery,
} = tshirtManagementApi;
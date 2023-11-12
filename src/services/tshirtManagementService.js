import { emptySplitApi } from ".";

const tshirtManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getShirts: builder.query({
            query: (model) => `api/v1/tshirt/q?skipRows=${model.pageIndex}&numberOfItems=${model.rowsPerPage}`
        }),
        addShirt: builder.mutation({
            query: (model) => ({
                url: "api/v1/tshirt",
                method: "POST",
                body: model,
            })
        })
    })
});

export const {
    useGetShirtsQuery,
    useAddShirtMutation,
} = tshirtManagementApi;
import { emptySplitApi } from ".";

const tshirtManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getShirts: builder.query({
            query: (model) => `api/v1/tshirt/q?skipRows=${model.pageIndex}&numberOfItems=${model.rowsPerPage}`
        }),
        getShirt: builder.query({
            query: (model) => `api/v1/tshirt/${model.id}`
        }),
        addShirt: builder.mutation({
            query: (model) => ({
                url: "api/v1/tshirt",
                method: "POST",
                body: model,
            })
        }),
        editShirt: builder.mutation({
            query: (payload) => ({
                url: `api/v1/tshirt/${payload.id}`,
                method: "PUT",
                body: payload.model,
            })
        })
    })
});

export const {
    useGetShirtsQuery,
    useGetShirtQuery,
    useAddShirtMutation,
    useEditShirtMutation,
} = tshirtManagementApi;
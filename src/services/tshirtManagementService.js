import { emptySplitApi } from ".";

const tshirtManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getShirts: builder.query({
            query: () => "api/v1/tshirt"
        }),
    })
});

export const {
    useGetShirtsQuery,
} = tshirtManagementApi;
import { emptySplitApi } from ".";

const customerManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => "api/v1/customers"
        })
    })
});

export const {
    useGetCustomersQuery,
} = customerManagementApi;
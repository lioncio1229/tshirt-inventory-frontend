import { emptySplitApi } from ".";

const orderManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getTshirtOrders: builder.query({
            query: () => "api/v1/tshirtorders"
        }),
        updateOrderStatus: builder.mutation({
            query: (payload) => ({
                url: `api/v1/tshirtorders/${payload.id}/status`,
                method: "PUT",
                body: payload.model,
            })
        }),
    })
});

export const {
    useGetTshirtOrdersQuery,
    useUpdateOrderStatusMutation,
} = orderManagementApi;
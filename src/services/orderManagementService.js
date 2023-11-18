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
        createOrder: builder.mutation({
            query: (payload) => ({
                url: `api/v1/customer/${payload.id}/order`,
                method: "POST",
                body: payload.model,
            })
        })
    })
});

export const {
    useGetTshirtOrdersQuery,
    useUpdateOrderStatusMutation,
    useCreateOrderMutation,
} = orderManagementApi;
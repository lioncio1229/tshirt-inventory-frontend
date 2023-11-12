import { emptySplitApi } from ".";

const authManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (model) => ({
                url: "api/v1/auth/register",
                method: "POST",
                body: model,
            })
        }),
        login: builder.mutation({
            query: (model) => ({
                url: "api/v1/auth/authenticate",
                method: "POST",
                body: model,
            })
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
} = authManagementApi;
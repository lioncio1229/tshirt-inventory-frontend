import { emptySplitApi } from ".";

const userManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/api/v1/users"
        }),
        getUser: builder.query({
            query: (payload) => `/api/v1/users/${payload.id}`
        }),
        addUser: builder.mutation({
            query: (model) => ({
                url: "api/v1/users",
                method: "POST",
                body: model,
            })
        }),
        updateUser: builder.mutation({
            query: (payload) => ({
                url: `api/v1/users/${payload.id}`,
                method: "PUT",
                body: payload.model,
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
} = userManagementApi;
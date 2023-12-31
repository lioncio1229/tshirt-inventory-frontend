import { emptySplitApi } from ".";

const userManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (model) => `/api/v1/users/q?searchByEmail=${model.searchByEmail}`
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
        }),
        deleteUser: builder.mutation({
            query: (payload) => ({
                url: `api/v1/users/${payload.id}`,
                method: "DELETE",
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userManagementApi;
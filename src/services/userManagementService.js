import { emptySplitApi } from ".";

const userManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/api/v1/users"
        }),
        addUser: builder.mutation({
            query: (model) => ({
                url: "api/v1/users",
                method: "POST",
                body: model,
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
} = userManagementApi;
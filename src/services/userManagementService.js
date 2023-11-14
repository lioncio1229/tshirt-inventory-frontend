import { emptySplitApi } from ".";

const userManagementApi = emptySplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/api/v1/users"
        }),
    })
});

export const {
    useGetUsersQuery,
} = userManagementApi;
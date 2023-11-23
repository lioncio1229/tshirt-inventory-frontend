import { emptySplitApi } from ".";

const tshirtManagementApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getShirts: builder.query({
      query: (model) =>
        `api/v1/tshirt/q?skipRows=${model.pageIndex}&numberOfItems=${model.rowsPerPage}&searchByName=${model.searchByName}`,
    }),
    getShirtsWithoutPagination: builder.query({
      query: () => `api/v1/tshirt`,
    }),
    getShirt: builder.query({
      query: (model) => `api/v1/tshirt/${model.id}`,
    }),
    addShirt: builder.mutation({
      query: (model) => ({
        url: "api/v1/tshirt",
        method: "POST",
        body: model,
      }),
    }),
    editShirt: builder.mutation({
      query: (payload) => ({
        url: `api/v1/tshirt/${payload.id}`,
        method: "PUT",
        body: payload.model,
      }),
    }),
    deleteShirt: builder.mutation({
      query: (id) => ({
        url: `api/v1/tshirt/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (model) => ({
        url: "api/v1/tshirt/image",
        method: "POST",
        body: model,
      }),
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `api/v1/tshirt/image/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
    useGetShirtsQuery,
    useGetShirtsWithoutPaginationQuery,
    useGetShirtQuery,
    useAddShirtMutation,
    useEditShirtMutation,
    useDeleteShirtMutation,
    useUploadImageMutation,
    useDeleteImageMutation,
} = tshirtManagementApi;
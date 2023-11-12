import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from "./services";

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewareList = [emptySplitApi.middleware, ...getDefaultMiddleware()];
    return middlewareList;
  },
})
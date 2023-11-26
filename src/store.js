import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from "./services";
import globalReducer from './globalSlice';

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewareList = [emptySplitApi.middleware, ...getDefaultMiddleware()];
    return middlewareList;
  },
})
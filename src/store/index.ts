import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fileApi } from "./api/fileApi";
import { authApi } from "./api/authApi"; // Import the authApi

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // Add the authApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fileApi.middleware,
      authApi.middleware // Add the authApi middleware
    ),
});

setupListeners(store.dispatch);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { videoApi } from "./api/videoApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // add the RTK Query slice under its reducerPath
    [videoApi.reducerPath]: videoApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware,authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

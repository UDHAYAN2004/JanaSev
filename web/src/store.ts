import { configureStore } from "@reduxjs/toolkit";
import appUserReducer from "./pages/appReducers/appUserReducer";
import { emptySplitApi } from "./pages/api/apiSlice"; // ✅ Import your RTK Query API slice

export const store = configureStore({
  reducer: {
    appUser: appUserReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

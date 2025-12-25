  import { createApi, fetchBaseQuery, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
  import type { BaseQueryFn } from "@reduxjs/toolkit/query";
  import { AUTH_APP_USER } from "../../utils/index";


  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const uploadEndpoints = ["uploadImage"];

      if (!endpoint || uploadEndpoints.indexOf(endpoint) < 0) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }

      const state: any = getState();

      // Add language header if it exists
      if (state?.appUser?.language?.length > 0) {
        headers.set("Accept-Language", state.appUser.language);
      }

      // Get appUser either from Redux or localStorage
      let appUser = state?.appUser?.token ? state.appUser : null;

      if (!appUser) {
        const storage = localStorage.getItem(AUTH_APP_USER);
        if (storage) {
          try {
            appUser = JSON.parse(storage);
          } catch {
            appUser = null;
          }
        }
      }

      // Set Authorization header if token exists
      if (appUser?.token) {
        headers.set("authorization", `Bearer ${appUser.token}`);
        if (appUser?.user?.id) {
          headers.set("user-id", appUser.user.id);
        }
      }

      return headers;
    },
  });

  //  Add type to baseQueryWithReauth
  const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    const result = await baseQuery(args, api, extraOptions);

    if (
      typeof args === "object" &&
      "url" in args &&
      args.url !== "/api/auth/login" &&
      result?.meta?.response?.status === 401
    ) {
      localStorage.removeItem(AUTH_APP_USER);
      window.location.reload();
    }

    return result;
  };

  export const emptySplitApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Login", "AppUser"],
    endpoints: () => ({}),
    refetchOnMountOrArgChange: true,
  });

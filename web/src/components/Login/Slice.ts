import { emptySplitApi } from "../../pages/api/apiSlice";

interface Login {
  userName: string;
  password: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  appUser: AppUser;
  message: string;
}

export const loginApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        validateStatus: (response, result) => {
          if (result?.invalidData || result?.error) {
            return true;
          }
          return response.ok;
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;

import { emptySplitApi } from "../../pages/api/apiSlice";

export interface SignUpRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  state: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const signUpApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation } = signUpApi;

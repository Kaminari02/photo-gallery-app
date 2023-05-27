import { api } from "./index";
import { IUser } from "@/interfaces/IUser";
import { UserForm } from "@/interfaces/UserForm";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, UserForm>({
      query: (body) => ({
        url: "auth/signup",
        method: "post",
        body,
      }),
    }),
    signIn: build.mutation<IUser, UserForm>({
      query: (body) => ({
        url: "auth/signin",
        method: "post",
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "delete",
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = authApi;

export default authApi;

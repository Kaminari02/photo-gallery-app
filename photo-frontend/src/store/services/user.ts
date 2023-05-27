import { api } from "@/store/services/index";
import { IPhoto } from "@/interfaces/IPhoto";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsersPhotos: build.query<IPhoto[], string | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: ["Photo"],
    })
  }),
  overrideExisting: false,
});

export const { useGetUsersPhotosQuery } = userApi;

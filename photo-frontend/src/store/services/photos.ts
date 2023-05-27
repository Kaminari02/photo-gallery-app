import { api } from "@/store/services/index";
import { IPhoto } from "@/interfaces/IPhoto";

const photoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPhotos: build.query<IPhoto[], void>({
      query: () => `/photos`,
      providesTags: ["Photo"],
    }),
    getPhotoById: build.query<IPhoto, string>({
        query: (id) => `/photos/${id}`
    }),
    addPhoto: build.mutation<IPhoto, FormData>({
      query: (body) => ({
        url: `/photos`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Photo"],
    }),
    deletePhoto: build.mutation<IPhoto , string >({
        query:(id) => ({
               url:`/photos/${id}`,
               method:'delete',
        }),
        invalidatesTags:['Photo']
    }),
  }),
  overrideExisting: false,
});

export const { useAddPhotoMutation, useDeletePhotoMutation, useLazyGetPhotoByIdQuery, useGetPhotosQuery } = photoApi;

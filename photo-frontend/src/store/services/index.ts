import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react';
import { apiUrl } from '@/common/constants';
import {RootState} from '@/store/store';
import {MongooseError} from '@/interfaces/errors/MongooseError';
import {CustomError} from '@/interfaces/errors/CustomError';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, {getState}) => {
       const state: RootState = getState();
       const token = state.auth.user?.token;
       if (token) {
         headers.set('Authorization', token);
       }
    }
  }) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | MongooseError | CustomError | {error: object}, {}, FetchBaseQueryMeta>,
  endpoints: () => ({}),
  tagTypes: [],
});
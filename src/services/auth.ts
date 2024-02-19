import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers, urlAPI } from '../healpers/api';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                headers: headers,
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authAPI;
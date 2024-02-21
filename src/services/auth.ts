import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers, urlAPI } from '@constants/api';

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
        signup: build.mutation({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                headers: headers,
                body,
            })
        }),
        checkEmail: build.mutation({
            query: (email) => ({
                url: '/auth/check-email',
                method: 'POST',
                headers: headers,
                body: email,
            })
        })
    }),
});

export const { useLoginMutation, useSignupMutation, useCheckEmailMutation } = authAPI;
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
        }),
        confirmEmail: build.mutation({
            query: (body) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                headers: headers,
                body,
                credentials: 'include'
            })
        }),
        changePassord : build.mutation({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'POST',
                headers: headers,
                body,
                credentials: 'include'
            })
        })
    }),
});

export const { useLoginMutation, useSignupMutation, useCheckEmailMutation, useConfirmEmailMutation, useChangePassordMutation } = authAPI;
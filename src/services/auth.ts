import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpointsAPI, urlAPI } from '@constants/api';
import { 
    IResponseLogin, 
    IRequestLogin, 
    IResponseCheck, 
    IRequestCheck, 
    IResponseConfirm, 
    IRequestConfirm, 
    IResponseChangePass,
    IRequestChangePass
} from '@tstypes/api';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    endpoints: (build) => ({
        login: build.mutation<IResponseLogin, IRequestLogin>({
            query: (body) => ({
                url: endpointsAPI.auth.logIn,
                method: 'POST',
                body,
            }),
        }),
        signup: build.mutation<object, IRequestLogin>({
            query: (body) => ({
                url: endpointsAPI.auth.signUp,
                method: 'POST',
                body,
            }),
        }),
        checkEmail: build.mutation<IResponseCheck, IRequestCheck>({
            query: (email) => ({
                url: endpointsAPI.auth.checkEmail,
                method: 'POST',
                body: email,
            }),
        }),
        confirmEmail: build.mutation<IResponseConfirm, IRequestConfirm>({
            query: (body) => ({
                url: endpointsAPI.auth.confirmEmail,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassord: build.mutation<IResponseChangePass, IRequestChangePass>({
            query: (body) => ({
                url: endpointsAPI.auth.changePassword,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePassordMutation,
} = authAPI;

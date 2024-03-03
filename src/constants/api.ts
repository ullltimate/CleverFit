import { IUrlAPI } from '@tstypes/api';

export const urlAPI: IUrlAPI = 'https://marathon-api.clevertec.ru';

type EndpointsAPI = {
    auth: {
        google: string,
        logIn: string,
        signUp: string,
        checkEmail: string,
        confirmEmail: string,
        changePassword: string,
    },
    feedback: string,
}

export const endpointsAPI: EndpointsAPI = {
    auth: {
        google: '/auth/google',
        logIn: '/auth/login',
        signUp: '/auth/registration',
        checkEmail: '/auth/check-email',
        confirmEmail: '/auth/confirm-email',
        changePassword: '/auth/change-password',
    },
    feedback: '/feedback',
}
export type IUrlAPI = string;

export interface IRequestLogin {
    email: string;
    password: string;
}

export interface IResponseLogin {
    accessToken: string;
}

export interface IRequestCheck {
    email: string;
}

export interface IResponseCheck {
    email: string;
    message: string;
}

export interface IRequestConfirm {
    email: string;
    code: string;
}

export interface IResponseConfirm {
    email: string;
    message: string;
}

export interface IRequestChangePass {
    password: string;
    confirmPassword: string;
}

export interface IResponseChangePass {
    message: string;
}
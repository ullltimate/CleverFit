export type IRegExp = RegExp;

export type ValidationMessage = {
    require: string,
    email: string,
    password: string,
    repeatPassword: string
}

export type FieldValue = {
    getFieldValue: (name: string) => string,
}
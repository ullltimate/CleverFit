export interface ICardInfo {
    title: string,
    btnText: string,
    btnIcon: React.ReactNode
}

export interface IAuthChildren {
    children: React.ReactNode
}

export interface IAuthItemsTab {
    label: string,
    key: string,
    children: React.ReactNode,
}

export interface IValidationMessage {
    require: string,
    email: string,
    password: string,
    repeatPassword: string
}

export interface IValuesLoginForm {
    email: string,
    password: string,
    remember: boolean
}

export interface IValuesSignupForm {
    email: string,
    password: string,
    repeatPassword: string
}
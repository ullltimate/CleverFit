export interface IResultData {
    error_login: IResultDataItem,
    success_signup: IResultDataItem,
    error_user_exist: IResultDataItem,
    error: IResultDataItem,
    error_change_password: IResultDataItem,
    success_change_password: IResultDataItem,
    error_email_no_exist: IResultDataItem,
    error_check_email: IResultDataItem,
}

interface IResultDataItem {
    icon: React.ReactNode
    title: string,
    text: string,
    btnText: string,
    btnPath: string,
    dataAtribute: string,
}
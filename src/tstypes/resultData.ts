export type ResultData = {
    error_login: ResultDataItem,
    success_signup: ResultDataItem,
    error_user_exist: ResultDataItem,
    error: ResultDataItem,
    error_change_password: ResultDataItem,
    success_change_password: ResultDataItem,
    error_email_no_exist: ResultDataItem,
    error_check_email: ResultDataItem,
}

type ResultDataItem = {
    icon: React.ReactNode
    title: string,
    text: string,
    btnText: string,
    btnPath: string,
    dataAtribute: string,
}
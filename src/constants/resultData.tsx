import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from "@ant-design/icons";
import { PATHS } from "./paths";

export const resultData = {
    error_login: {
        icon: <WarningFilled className='result-icon icon-warning'/>,
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        btnText: 'Повторить',
        btnPath: PATHS.AUTH
    },
    success_signup: {
        icon: <CheckCircleFilled className='result-icon icon-success'/>,
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        btnText: 'Войти',
        btnPath: PATHS.AUTH
    },
    error_user_exist: {
        icon: <CloseCircleFilled className='result-icon icon-error'/>,
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        btnText: 'Назад к регистрации',
        btnPath: PATHS.REGISTRATION
    },
    error: {
        icon: <CloseCircleFilled className='result-icon icon-error'/>,
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        btnText: 'Повторить',
        btnPath: PATHS.REGISTRATION
    },
    error_change_password : {
        icon: <CloseCircleFilled className='result-icon icon-error'/>,
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так попробуйте ещё раз.',
        btnText: 'Повторить',
        btnPath: PATHS.CHANGE_PASSWORD
    },
    success_change_password: {
        icon: <CheckCircleFilled className='result-icon icon-success'/>,
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        btnText: 'Вход',
        btnPath: PATHS.AUTH
    },
}
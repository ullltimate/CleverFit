import { PATHS } from "./paths";

export const routes = {
    main: [
        {
            name: 'Главная',
        },
    ],
    feedbacks: [
        {
            path: PATHS.MAIN,
            name: 'Главная',
        },
        {
            name: 'Отзывы пользователей',
        },
    ]
};
import { PATHS } from './paths';

export type BreadCrumbRoute = {
    name: string,
    path?: string,
}

type BreadCrumbRoutes = {
    main: BreadCrumbRoute[],
    feedbacks: BreadCrumbRoute[],
    calendar: BreadCrumbRoute[],
    training: BreadCrumbRoute[],
    achievements: BreadCrumbRoute[],
}

export const routes: BreadCrumbRoutes = {
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
    ],
    calendar: [
        {
            path: PATHS.MAIN,
            name: 'Главная',
        },
        {
            name: 'Календарь',
        },
    ],
    training: [
        {
            path: PATHS.MAIN,
            name: 'Главная',
        },
        {
            name: 'Тренировки',
        },
    ],
    achievements: [
        {
            path: PATHS.MAIN,
            name: 'Главная',
        },
        {
            name: 'Достижения',
        },
    ],
};

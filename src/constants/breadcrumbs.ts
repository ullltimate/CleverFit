import { PATHS } from './paths';

export type IBreadCrumbRoute = {
    name: string,
    path?: string,
}

type IBreadCrumbRoutes = {
    main: IBreadCrumbRoute[],
    feedbacks: IBreadCrumbRoute[],
}

export const routes: IBreadCrumbRoutes = {
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
};

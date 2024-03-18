import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpointsAPI, urlAPI } from '@constants/api';
import { store } from '@redux/configure-store';

type TrainingList = {
    name: string;
    key: string;
};

export const catalogsAPI = createApi({
    reducerPath: 'catalogsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: urlAPI,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || store.getState().tokenReducer.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        getTrainingList: build.query<TrainingList[], void>({
            query: () => ({
                url: endpointsAPI.catalogs.training,
            }),
        }),
    }),
});

export const { useGetTrainingListQuery } = catalogsAPI;

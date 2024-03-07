import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpointsAPI, urlAPI } from '@constants/api';
import { store } from '@redux/configure-store';

type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: {
        repeat: boolean;
        period: null;
        jointTraining: boolean;
        participants: [];
    };
    exercises: [
        {
            _id: string;
            name: string;
            replays: number;
            weight: number;
            approaches: number;
            isImplementation: boolean;
        },
    ];
};

export const trainingAPI = createApi({
    reducerPath: 'trainingAPI',
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
        getTraining: build.query<Training[], void>({
            query: () => ({
                url: endpointsAPI.training,
            }),
        }),
    }),
});

export const { useGetTrainingQuery, useLazyGetTrainingQuery } = trainingAPI;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlAPI } from '@constants/api';

interface IFeedbacks {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: 0;
    createdAt: string;
}

export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    endpoints: (build) => ({
        getFeedbacks: build.query<IFeedbacks, void>({
            query: () => ({
                url: '/feedback',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
        }),
    }),
});

export const { useLazyGetFeedbacksQuery, useGetFeedbacksQuery } = feedbackAPI;

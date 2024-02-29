import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlAPI } from '@constants/api';
import { IFeedbacks } from '@tstypes/feedbacks';


export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    endpoints: (build) => ({
        getFeedbacks: build.query<IFeedbacks[], void>({
            query: () => ({
                url: '/feedback',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
        }),
    }),
});

export const { useLazyGetFeedbacksQuery, useGetFeedbacksQuery } = feedbackAPI;

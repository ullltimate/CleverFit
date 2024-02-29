import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers, urlAPI } from '@constants/api';


export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    endpoints: (build) => ({
        getFeedbacks: build.query({
            query: () => ({
                url: '/feedback',
                headers: headers,
            })
        })
    }),
});

export const { useGetFeedbacksQuery } = feedbackAPI;
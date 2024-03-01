import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlAPI } from '@constants/api';
import { IFeedbacks } from '@tstypes/feedbacks';


export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
    tagTypes: ['Feedback'],
    endpoints: (build) => ({
        getFeedbacks: build.query<IFeedbacks[], void>({
            query: () => ({
                url: '/feedback',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }),
            providesTags: () => ['Feedback']
        }),
        createReview: build.mutation({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body,
            }),
            invalidatesTags: ['Feedback'],
        })
    }),
});

export const { useLazyGetFeedbacksQuery, useGetFeedbacksQuery, useCreateReviewMutation } = feedbackAPI;

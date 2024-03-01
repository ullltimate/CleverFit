import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlAPI } from '@constants/api';
import { IFeedbacks } from '@tstypes/feedbacks';
import { store } from '@redux/configure-store';


export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    baseQuery: fetchBaseQuery({ baseUrl: urlAPI, prepareHeaders: (headers) => {
        const token = localStorage.getItem('token') || store.getState().tokenReducer.token ;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }, }),
    tagTypes: ['Feedback'],
    endpoints: (build) => ({
        getFeedbacks: build.query<IFeedbacks[], void>({
            query: () => ({
                url: '/feedback',
            }),
            providesTags: () => ['Feedback']
        }),
        createReview: build.mutation({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Feedback'],
        })
    }),
});

export const { useLazyGetFeedbacksQuery, useGetFeedbacksQuery, useCreateReviewMutation } = feedbackAPI;

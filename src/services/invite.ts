import { endpointsAPI, urlAPI } from '@constants/api';
import { store } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TrainingPals } from './catalogs';

export type Invite = {
    _id: string;
    from: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
    training: {
        _id: string;
        name: string;
        date: string;
        isImplementation: boolean;
        userId: string;
        parameters: {
            repeat: boolean;
            period: number;
            jointTraining: boolean;
            participants: string[];
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
    status: string;
    createdAt: string;
};

export const inviteAPI = createApi({
    reducerPath: 'invateAPI',
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
    tagTypes: ['Invite'],
    endpoints: (build) => ({
        getInvite: build.query<Invite[], void>({
            query: () => ({
                url: endpointsAPI.invite,
            }),
            providesTags: () => ['Invite'],
        }),
        getTrainingPartners: build.query<TrainingPals[], void>({
            query: () => ({
                url: endpointsAPI.catalogs.trainingPals,
            }),
            providesTags: ['Invite'],
        }),
        sendInvite: build.mutation({
            query: (body) => ({
                url: endpointsAPI.invite,
                method: 'POST',
                body,
            }),
        }),
        replyInvite: build.mutation({
            query: (body) => ({
                url: endpointsAPI.invite,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Invite'],
        }),
        cancelInvite: build.mutation({
            query: (id) => ({
                url: `${endpointsAPI.invite}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Invite'],
        }),
    }),
});

export const { useGetInviteQuery, useSendInviteMutation, useReplyInviteMutation, useCancelInviteMutation, useGetTrainingPartnersQuery } = inviteAPI;

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authAPI } from '@services/auth';
import userSlice from './reducers/user-slice';
import { feedbackAPI } from '@services/feedbacks';
import tokenSlice from './reducers/token-slice';
import { trainingAPI } from '@services/trainings';
import { catalogsAPI } from '@services/catalogs';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        userReducer: userSlice,
        [feedbackAPI.reducerPath]: feedbackAPI.reducer,
        tokenReducer: tokenSlice,
        [trainingAPI.reducerPath]: trainingAPI.reducer,
        [catalogsAPI.reducerPath]: catalogsAPI.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            authAPI.middleware,
            feedbackAPI.middleware,
            trainingAPI.middleware,
            catalogsAPI.middleware,
        ),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

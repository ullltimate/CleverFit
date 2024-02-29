import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authAPI } from '@services/auth';
import userSlice from './reducers/userSlice';
import { feedbackAPI } from '@services/feedbacks';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        userReducer: userSlice,
        [feedbackAPI.reducerPath]: feedbackAPI.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, authAPI.middleware, feedbackAPI.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

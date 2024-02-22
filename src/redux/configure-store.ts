import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authAPI } from '../services/auth';
import userSlice from './reducers/userSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        userReducer: userSlice,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, authAPI.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

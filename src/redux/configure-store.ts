import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { authAPI } from "../services/auth";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, authAPI.middleware),
});

export const history = createReduxHistory(store);

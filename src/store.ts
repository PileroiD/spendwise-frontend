import { combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { accountsReducer, appReducer, userReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	accounts: accountsReducer,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

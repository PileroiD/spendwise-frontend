import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { accountsReducer, appReducer, userReducer } from "./reducers";

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    accounts: accountsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

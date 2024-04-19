import { ACTION_TYPE } from "../actions";

const initialAccountsState = {
    accounts: [],
};

export const accountsReducer = (state = initialAccountsState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_ACCOUNTS:
            if (action.payload) {
                return {
                    ...state,
                    accounts: [...action.payload],
                };
            } else {
                return state;
            }

        default:
            return state;
    }
};

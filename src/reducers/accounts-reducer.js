import { ActionType } from "../actions";

const initialAccountsState = {
	accounts: [],
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ActionType.SET_ACCOUNTS:
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

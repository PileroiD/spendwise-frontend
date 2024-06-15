import { AccountsAction, AccountsReducerState } from "../types/accounts-reducer-types";
import { ActionType } from "../actions";

const initialAccountsState: AccountsReducerState = {
	accounts: [],
};

export const accountsReducer = (
	state = initialAccountsState,
	action: AccountsAction
): AccountsReducerState => {
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

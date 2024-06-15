import { ActionType } from "../actions/action-type";
import { Account } from "./types";

export interface AccountsReducerState {
	accounts: Account[];
}

export interface SetAccountsAction {
	type: ActionType.SET_ACCOUNTS;
	payload?: Account[];
}

export type AccountsAction = SetAccountsAction;

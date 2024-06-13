import { Account } from "./../types/types";
import { ActionType } from "./action-type";

export const setAccounts = (accounts: Account[]) => ({
	type: ActionType.SET_ACCOUNTS,
	payload: accounts,
});

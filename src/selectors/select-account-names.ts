import { Account } from "../types/types";
import { RootState } from "../store";

export interface AccountName {
	accountName: string;
	accountId: string;
}

export const selectAccountNames = (state: RootState): AccountName[] =>
	state.accounts.accounts.map((account: Account) => ({
		accountName: account.title,
		accountId: account.id,
	}));

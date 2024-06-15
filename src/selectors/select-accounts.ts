import { Account } from "../types/types";
import { RootState } from "../store";

export const selectAccounts = (state: RootState): Account[] => state.accounts.accounts;

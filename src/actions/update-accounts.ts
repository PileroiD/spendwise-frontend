import { Dispatch } from "redux";
import { request } from "../utils/request";

import { setAccounts } from "./set-accounts";
import { AccountsResponse } from "./../types/types";

export const updateAccounts = () => async (dispatch: Dispatch) => {
	const response: AccountsResponse = await request("/accounts?records=true", "GET");
	if (!response.error) {
		dispatch(setAccounts(response.accounts));
	}
};

import { Dispatch } from "redux";
import { request } from "../utils/request";

import { setAccounts } from "./set-accounts";
import { AccountsResponse } from "./../types/types";

export const updateAccounts = () => (dispatch: Dispatch) => {
	request("/accounts?records=true", "GET").then((response: AccountsResponse) => {
		if (!response.error) {
			dispatch(setAccounts(response.accounts));
		}
	});
};

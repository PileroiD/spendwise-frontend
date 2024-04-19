import { request } from "../utils/request";
import { setAccounts } from "./set-accounts";

export const updateAccounts = () => (dispatch) => {
    request("/accounts?records=true", "GET").then((response) => {
        if (!response.error) {
            dispatch(setAccounts(response.accounts));
        }
    });
};

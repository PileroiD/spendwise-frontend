import { User } from "./../types/types";
import { ActionType } from "./action-type";

export const setUser = (user: User) => ({
	type: ActionType.SET_USER,
	payload: user,
});

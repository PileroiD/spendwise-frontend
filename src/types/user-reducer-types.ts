import { ActionType } from "../actions/action-type";
import { User } from "./types";

export interface SetUserAction {
	type: ActionType.SET_USER;
	payload: User;
}

export type UserAction = SetUserAction;

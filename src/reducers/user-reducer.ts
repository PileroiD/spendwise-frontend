import { User } from "../types/types";
import { ActionType } from "../actions";
import { UserAction } from "../types/user-reducer-types";

export const initialUserState: User = {
	id: "",
	email: "",
	registeredAt: "",
};

export const userReducer = (state = initialUserState, action: UserAction): User => {
	switch (action.type) {
		case ActionType.SET_USER:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

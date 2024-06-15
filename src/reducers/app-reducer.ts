import { AppAction, AppState } from "../types/app-reducer-types";
import { ActionType } from "../actions";

const initialAppState: AppState = {
	sideWindow: {
		isOpen: false,
		firstTimeOpen: true,
	},
};

export const appReducer = (state = initialAppState, action: AppAction): AppState => {
	switch (action.type) {
		case ActionType.TOGGLE_SIDE_WINDOW:
			return {
				...state,
				sideWindow: {
					...state.sideWindow,
					isOpen: !state.sideWindow.isOpen,
				},
			};
		case ActionType.FIRST_OPEN:
			return {
				...state,
				sideWindow: { ...state.sideWindow, firstTimeOpen: false },
			};
		default:
			return state;
	}
};

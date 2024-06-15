import { ActionType } from "../actions/action-type";

interface SideWindow {
	isOpen: boolean;
	firstTimeOpen: boolean;
}

export interface AppState {
	sideWindow: SideWindow;
}

export interface ToggleSideWindowAction {
	type: ActionType.TOGGLE_SIDE_WINDOW;
	payload: AppState;
}

export interface FirstOpenAction {
	type: ActionType.FIRST_OPEN;
}

export type AppAction = ToggleSideWindowAction | FirstOpenAction;

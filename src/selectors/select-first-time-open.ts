import { RootState } from "../store";

export const selectFirstTimeOpen = (state: RootState): boolean =>
	state.app.sideWindow.firstTimeOpen;

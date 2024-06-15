import { RootState } from "../store";

export const selectSideWindowIsOpen = (state: RootState): boolean => state.app.sideWindow.isOpen;

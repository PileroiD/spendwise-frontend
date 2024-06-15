import { RootState } from "../store";

export const selectUserId = (state: RootState): boolean => !!state.user.id;

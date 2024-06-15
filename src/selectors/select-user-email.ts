import { RootState } from "../store";

export const selectUserEmail = (state: RootState): string => state.user.email;

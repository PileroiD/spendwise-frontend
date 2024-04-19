import { ACTION_TYPE } from "../actions";

const initialAppState = {
    sideWindow: {
        isOpen: false,
        firstTimeOpen: true,
    },
};

export const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case ACTION_TYPE.TOGGLE_SIDE_WINDOW:
            return {
                ...state,
                sideWindow: {
                    ...state.sideWindow,
                    isOpen: !state.sideWindow.isOpen,
                },
            };
        case ACTION_TYPE.FIRST_OPEN:
            return {
                ...state,
                sideWindow: { ...state.sideWindow, firstTimeOpen: false },
            };
        default:
            return state;
    }
};

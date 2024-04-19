import { ACTION_TYPE } from "../actions";

export const initialUserState = {
    id: "",
    email: "",
    registeredAt: "",
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

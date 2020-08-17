import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isConnecting: false,
    room: {},
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CONNECT_MENTOR_START:
            return {
                ...state,
                isConnecting: true,
            };
        case actionTypes.CONNECT_MENTOR_SUCCESS:
            return {
                ...state,
                isConnecting: false,
                room: action.payload,
            };
        default:
            return state;
    }
}

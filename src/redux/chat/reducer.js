import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isConnecting: false,
    room: {},
    messagesList: [],
};

export default function (state = INITIAL_STATE, action) {
    const { messagesList } = state;
    const { payload } = action;

    switch (action.type) {
        case actionTypes.CONNECT_MENTOR_START:
            return {
                ...state,
                isConnecting: true,
                messagesList: [],
                room: {},
            };
        case actionTypes.CONNECT_MENTOR_SUCCESS:
            return {
                ...state,
                isConnecting: false,
                room: payload.room,
                messagesList: payload.messages,
            };
        case actionTypes.ADD_MESSAGE_INTO_LIST:
            return {
                ...state,
                messagesList:
                    payload.id !== messagesList[messagesList.length - 1]?.id
                        ? messagesList.concat([action.payload])
                        : messagesList,
            };
        default:
            return state;
    }
}

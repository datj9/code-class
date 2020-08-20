import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isConnecting: false,
    room: {},
    messagesList: [],
    roomsList: [],
    isFetchingRooms: false,
    loaded: false,
};

export default function (state = INITIAL_STATE, action) {
    const { messagesList } = state;
    const { payload } = action;
    const roomsList = state.roomsList;

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
            let newRoom;
            const roomIndex = roomsList.findIndex((room) => room.id === payload.room.id);
            if (roomIndex >= 0) {
                roomsList[roomIndex].lastestMessage = payload;
            } else {
                newRoom = {
                    ...payload.room,
                };
                newRoom.lastestMessage = payload;
                newRoom.receiver = payload.receiver;
            }

            return {
                ...state,
                roomsList: newRoom ? [newRoom].concat(roomsList) : roomsList,
                messagesList:
                    payload.id !== messagesList[messagesList.length - 1]?.id
                        ? messagesList.concat([action.payload])
                        : messagesList,
            };
        case actionTypes.GET_ROOMS_START:
            return {
                ...state,
                isFetchingRooms: true,
                loaded: false,
            };
        case actionTypes.GET_ROOMS_SUCCESS:
            return {
                ...state,
                isFetchingRooms: false,
                roomsList: action.payload,
                loaded: true,
            };
        default:
            return state;
    }
}

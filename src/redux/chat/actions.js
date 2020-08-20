import * as actionTypes from "./action-types";
import BaseAPI from "../../api";

const api = BaseAPI();

const connectMentorStart = () => ({
    type: actionTypes.CONNECT_MENTOR_START,
});
const connectMentorSuccess = (room) => ({
    type: actionTypes.CONNECT_MENTOR_SUCCESS,
    payload: room,
});
export const connectMentor = (members) => async (dispatch) => {
    dispatch(connectMentorStart());
    const data = await api.post("/rooms/connect-mentor", { members });
    if (data.room) {
        dispatch(connectMentorSuccess(data));
    }
};

const getRoomsStart = () => ({
    type: actionTypes.GET_ROOMS_START,
});
const getRoomsSuccess = (roomsList) => ({
    type: actionTypes.GET_ROOMS_SUCCESS,
    payload: roomsList,
});
export const getRooms = () => async (dispatch) => {
    dispatch(getRoomsStart());
    const data = await api.get("/rooms");
    if (Array.isArray(data)) {
        dispatch(getRoomsSuccess(data));
    }
};

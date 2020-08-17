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
    if (data.id) {
        dispatch(connectMentorSuccess(data));
    }
};

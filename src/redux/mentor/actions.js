import * as actionTypes from "./action-types";
import BaseAPI from "../../api";

const api = BaseAPI();

const getMentorsListStart = () => ({
    type: actionTypes.GET_MENTORS_LIST_START,
});
const getMentorsListSuccess = (mentorsList) => ({
    type: actionTypes.GET_MENTORS_LIST_SUCCESS,
    payload: mentorsList,
});
export const getMentorsList = () => async (dispatch) => {
    dispatch(getMentorsListStart());
    const data = await api.get("/mentors/active-mentors");
    if (Array.isArray(data)) {
        dispatch(getMentorsListSuccess(data));
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

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

const updateMentorInfoStart = () => ({
    type: actionTypes.UPDATE_MENTOR_INFO_START,
});
const updateMentorInfoSuccess = () => ({
    type: actionTypes.UPDATE_MENTOR_INFO_SUCCESS,
});
const updateMentorInfoErr = (errors) => ({
    type: actionTypes.UPDATE_MENTOR_INFO_FAIL,
    payload: errors,
});
export const updateMentorInfo = (mentorId, mentorInfo) => async (dispatch) => {
    dispatch(updateMentorInfoStart());
    const data = await api.put(`/mentors/${mentorId}`, mentorInfo);
    if (data.message?.includes("success")) {
        dispatch(updateMentorInfoSuccess());
    } else {
        dispatch(updateMentorInfoErr(data));
    }
};

import * as actionTypes from "./action-types";
import BaseApi from "../../api";
import axios from "axios";

const api = BaseApi();
const apiCheckIp = "https://ipapi.co";

const fetchTutorialsStart = (pageIndex) => ({
    type: actionTypes.FETCH_TUTORIALS_START,
    payload: { pageIndex },
});

const fetchTutorialsSuccess = (tutorials, total, pageIndex) => ({
    type: actionTypes.FETCH_TUTORIALS_SUCCESS,
    payload: { tutorials, total, pageIndex },
});

const fetchTutorialsFailure = (err) => ({
    type: actionTypes.FETCH_TUTORIALS_FAILURE,
    payload: err,
});

export const fetchTutorials = (pageSize, pageIndex) => async (dispatch) => {
    dispatch(fetchTutorialsStart(pageIndex));
    try {
        const data = await api.get(`/tutorials?pageSize=${pageSize}&&pageIndex=${pageIndex}`);
        dispatch(fetchTutorialsSuccess(data.tutorials, data.total, pageIndex));
    } catch (error) {
        dispatch(fetchTutorialsFailure(error));
    }
};

const fetchOneTutorialStart = () => ({
    type: actionTypes.FETCH_ONE_TUTORIAL_START,
});

const fetchOneTutorialSuccess = (tutorial) => ({
    type: actionTypes.FETCH_ONE_TUTORIAL_SUCCESS,
    payload: tutorial,
});

export const fetchOneTutorial = (tutorialId) => async (dispatch) => {
    dispatch(fetchOneTutorialStart());
    const data = await api.get(`/tutorials/${tutorialId}`);
    if (data.id) {
        dispatch(fetchOneTutorialSuccess(data));
    }
};

const clearTutorialStart = () => ({
    type: actionTypes.CLEAR_TUTORIAL,
});

export const clearTutorial = () => (dispatch) => {
    dispatch(clearTutorialStart());
};

const getSavedTutorialsStart = () => ({
    type: actionTypes.GET_SAVED_TUTORIALS_START,
});

const getSavedTutorialsSuccess = (savedTutorials) => ({
    type: actionTypes.GET_SAVED_TUTORIALS_SUCCESS,
    payload: savedTutorials,
});

export const getSavedTutorials = () => async (dispatch) => {
    dispatch(getSavedTutorialsStart());
    const data = await api.get("/auth/saved-tutorials");
    if (data.length >= 0) {
        dispatch(getSavedTutorialsSuccess(data));
    }
};

const searchTutorialsStart = (pageIndex) => ({
    type: actionTypes.SEARCH_TUTORIALS_START,
    payload: { pageIndex },
});
const searchTutorialsSuccess = (tutorials, total, pageIndex) => ({
    type: actionTypes.SEARCH_TUTORIALS_SUCCESS,
    payload: { tutorials, total, pageIndex },
});
export const searchTutorials = (pageSize, pageIndex, technologies) => async (dispatch) => {
    dispatch(searchTutorialsStart(pageIndex));

    const data = await api.get(
        `/tutorials?tags=${JSON.stringify(technologies)}&&pageSize=${pageSize}&&pageIndex=${pageIndex}`
    );
    if (Array.isArray(data.tutorials)) {
        dispatch(searchTutorialsSuccess(data.tutorials, data.total, pageIndex));
    }
};

export const increaseView = (tutorialId) => async (dispatch) => {
    const resIP = await axios.get(`${apiCheckIp}/ip`);
    const resCity = await axios.get(`${apiCheckIp}/city`);
    await api.patch("/tutorials/increase-view", { ip: resIP.data, city: resCity.data, tutorialId });
};

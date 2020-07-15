import {
    FETCH_TUTORIALS_START,
    FETCH_TUTORIALS_SUCCESS,
    FETCH_TUTORIALS_FAILURE,
    UPLOAD_IMAGE_START,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    CREATE_TUTORIAL_START,
    CREATE_TUTORIAL_SUCCESS,
    CREATE_TUTORIAL_FAILURE,
    FETCH_ONE_TUTORIAL_START,
    FETCH_ONE_TUTORIAL_SUCCESS,
    CLEAR_TUTORIAL,
    DELETE_TUTORIAL_START,
    DELETE_TUTORIAL_SUCCESS,
    UPDATE_TUTORIAL_START,
    UPDATE_TUTORIAL_SUCCESS,
    UPDATE_TUTORIAL_FAILURE,
    CLEAR_ERRORS_AND_LINK,
    GET_SAVED_TUTORIALS_START,
    GET_SAVED_TUTORIALS_SUCCESS,
    SEARCH_TUTORIALS_START,
    SEARCH_TUTORIALS_SUCCESS,
} from "./action-types";
import BaseApi from "../../api";
import axios from "axios";

const api = BaseApi();
const apiCheckIp = "https://ipapi.co";

const fetchTutorialsStart = () => ({
    type: FETCH_TUTORIALS_START,
});

const fetchTutorialsSuccess = (tutorials) => ({
    type: FETCH_TUTORIALS_SUCCESS,
    payload: tutorials,
});

const fetchTutorialsFailure = (err) => ({
    type: FETCH_TUTORIALS_FAILURE,
    payload: err,
});

export const fetchTutorials = () => async (dispatch) => {
    dispatch(fetchTutorialsStart());
    try {
        const data = await api.get("/tutorials");
        dispatch(fetchTutorialsSuccess(data));
    } catch (error) {
        dispatch(fetchTutorialsFailure(error));
    }
};

const fetchOneTutorialStart = () => ({
    type: FETCH_ONE_TUTORIAL_START,
});

const fetchOneTutorialSuccess = (tutorial) => ({
    type: FETCH_ONE_TUTORIAL_SUCCESS,
    payload: tutorial,
});

export const fetchOneTutorial = (tutorialId) => async (dispatch) => {
    dispatch(fetchOneTutorialStart());
    const data = await api.get(`/tutorials/${tutorialId}`);
    if (data.id) {
        dispatch(fetchOneTutorialSuccess(data));
    }
};

const uploadImageStart = () => ({
    type: UPLOAD_IMAGE_START,
});

const uploadImageSuccess = (url) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: url,
});

const uploadImageFailure = (err) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: err,
});

export const uploadImage = (file) => async (dispatch) => {
    dispatch(uploadImageStart());
    const formData = new FormData();
    formData.append("image", file);
    const data = await api.post("/tutorials/upload-image", formData, "formData");
    if (data.linkUrl) {
        dispatch(uploadImageSuccess(data.linkUrl));
    } else {
        dispatch(uploadImageFailure(data));
    }
};

export const createTutorialStart = () => ({
    type: CREATE_TUTORIAL_START,
});

export const createTutorialSuccess = (tutorial) => ({
    type: CREATE_TUTORIAL_SUCCESS,
    payload: tutorial,
});

export const createTutorialFail = (err) => ({
    type: CREATE_TUTORIAL_FAILURE,
    payload: err,
});

export const createTutorial = (tutorial) => async (dispatch) => {
    dispatch(createTutorialStart());
    const data = await api.post("/tutorials", tutorial);
    if (data.id) {
        dispatch(createTutorialSuccess(data));
    } else {
        dispatch(createTutorialFail(data));
    }
};

const deleteTutorialStart = () => ({
    type: DELETE_TUTORIAL_START,
});

const deleteTutorialSuccess = (tutorialId) => ({
    type: DELETE_TUTORIAL_SUCCESS,
    payload: tutorialId,
});

export const deleteTutorial = (tutorialId) => async (dispatch) => {
    dispatch(deleteTutorialStart());
    const data = await api.delete(`/tutorials/${tutorialId}`);
    if (data.message) {
        dispatch(deleteTutorialSuccess(tutorialId));
    }
};

const updateTutorialStart = () => ({
    type: UPDATE_TUTORIAL_START,
});

const updateTutorialSuccess = () => ({
    type: UPDATE_TUTORIAL_SUCCESS,
});

const updateTutorialFail = (err) => ({
    type: UPDATE_TUTORIAL_FAILURE,
    payload: err,
});

export const updateTutorial = (tutorialId, updateData) => async (dispatch) => {
    dispatch(updateTutorialStart());
    const data = await api.put(`/tutorials/${tutorialId}`, updateData);
    if (data.id) {
        dispatch(updateTutorialSuccess());
    } else {
        dispatch(updateTutorialFail(data));
    }
};

const clearTutorialStart = () => ({
    type: CLEAR_TUTORIAL,
});

export const clearTutorial = () => (dispatch) => {
    dispatch(clearTutorialStart());
};

const clearErrorsAndLinkStart = () => ({
    type: CLEAR_ERRORS_AND_LINK,
});

export const clearErrorsAndLink = () => (dispatch) => {
    dispatch(clearErrorsAndLinkStart());
};

const getSavedTutorialsStart = () => ({
    type: GET_SAVED_TUTORIALS_START,
});

const getSavedTutorialsSuccess = (savedTutorials) => ({
    type: GET_SAVED_TUTORIALS_SUCCESS,
    payload: savedTutorials,
});

export const getSavedTutorials = () => async (dispatch) => {
    dispatch(getSavedTutorialsStart());
    const data = await api.get("/auth/saved-tutorials");
    if (data.length >= 0) {
        dispatch(getSavedTutorialsSuccess(data));
    }
};

const searchTutorialsStart = () => ({
    type: SEARCH_TUTORIALS_START,
});
const searchTutorialsSuccess = (tutorials) => ({
    type: SEARCH_TUTORIALS_SUCCESS,
    payload: tutorials,
});
export const searchTutorials = (technologies) => async (dispatch) => {
    dispatch(searchTutorialsStart());
    console.log(technologies);
    const data = await api.get(`/tutorials?tags=${JSON.stringify(technologies)}`);
    if (Array.isArray(data)) {
        dispatch(searchTutorialsSuccess(data));
    }
};

export const increaseView = (tutorialId) => async (dispatch) => {
    const ip = await axios.get(`${apiCheckIp}/ip`);
    const city = await axios.get(`${apiCheckIp}/city`);
    await api.patch("/tutorials/increase-view", { ip, city, tutorialId });
};

import * as actionTypes from "./action-types";
import jwtDecode from "jwt-decode";
import BaseApi from "../../api";

const api = BaseApi();

const signUpStart = () => ({
    type: actionTypes.SIGN_UP_START,
});

const signUpSuccess = (user) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user,
});

const signUpFail = (err) => ({
    type: actionTypes.SIGN_UP_FAILURE,
    payload: err,
});

export const signUp = (user) => async (dispatch) => {
    dispatch(signUpStart());
    try {
        const data = await api.post("/auth/sign-up", user);
        if (data.token) {
            const decoded = jwtDecode(data.token);
            localStorage.setItem("token", data.token);
            dispatch(signUpSuccess(decoded));
        } else {
            dispatch(signUpFail(data));
        }
    } catch (error) {
        dispatch(signUpFail(error));
    }
};

const setUserStart = (user) => ({
    type: actionTypes.SET_USER_START,
    payload: user,
});

export const setUser = (user) => (dispatch) => {
    dispatch(setUserStart(user));
};

const signOutStart = () => ({
    type: actionTypes.SIGN_OUT_START,
});

export const signOut = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(signOutStart());
};

const signInStart = () => ({
    type: actionTypes.SIGN_IN_START,
});

const signInSuccess = (user) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

const signInFail = (err) => ({
    type: actionTypes.SIGN_IN_FAILURE,
    payload: err,
});

export const signIn = (user) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const data = await api.post("/auth/sign-in", user);

        if (data.token) {
            const decoded = jwtDecode(data.token);
            localStorage.setItem("token", data.token);
            dispatch(signInSuccess(decoded));
        } else {
            dispatch(signInFail(data));
        }
    } catch (error) {
        dispatch(signInFail(error));
    }
};

const clearErrorsStart = () => ({
    type: actionTypes.CLEAR_ERRORS,
});

export const clearErrors = () => (dispatch) => {
    dispatch(clearErrorsStart());
};

const saveTutorialStart = () => ({
    type: actionTypes.SAVE_TUTORIAL_START,
});

const saveTutorialSuccess = (savedTutorials) => ({
    type: actionTypes.SAVE_TUTORIAL_SUCCESS,
    payload: savedTutorials,
});

const saveTutorialFail = (err) => ({
    type: actionTypes.SAVE_TUTORIAL_FAILURE,
    payload: err,
});

export const saveTutorial = (tutorialId) => async (dispatch) => {
    dispatch(saveTutorialStart());
    const data = await api.post(`/users/save-tutorial?tutorialId=${tutorialId}`);

    if (data.token) {
        const decoded = jwtDecode(data.token);
        localStorage.setItem("token", data.token);
        dispatch(saveTutorialSuccess(decoded.savedTutorials));
    } else {
        dispatch(saveTutorialFail(data));
    }
};

const uploadProfileImageStart = () => ({
    type: actionTypes.UPLOAD_PROFILE_IMAGE_START,
});
const uploadProfileImageSuccess = (imageUrl) => ({
    type: actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS,
    payload: imageUrl,
});
export const uploadProfileImage = (file) => async (dispatch) => {
    dispatch(uploadProfileImageStart());
    const formData = new FormData();
    formData.append("image", file);
    const data = await api.post("/users/upload-profile", formData, "formData");
    if (data.linkUrl) {
        dispatch(uploadProfileImageSuccess(data.linkUrl));
    }
};

const updateUserInfoStart = () => ({
    type: actionTypes.UPDATE_USER_INFO_START,
});
const updateUserInfoSuccess = (user) => ({
    type: actionTypes.UPDATE_USER_INFO_SUCCESS,
    payload: user,
});
const updateUserInfoErr = (errors) => ({
    type: actionTypes.UPDATE_USER_INFO_SUCCESS,
    payload: errors,
});
export const updateUserInfo = (userInfo) => async (dispatch) => {
    dispatch(updateUserInfoStart());
    const data = await api.put("/users", userInfo);
    if (data.token) {
        const { token } = data;
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        dispatch(updateUserInfoSuccess(decodedUser));
    } else {
        dispatch(updateUserInfoErr(data));
    }
};

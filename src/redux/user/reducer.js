import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isUploading: false,
    currentUser: {},
    savedTutorials: [],
    isAuthenticated: false,
    errors: {},
    message: "",
    profileImageURL: "",
};

export default (state = INITIAL_STATE, action) => {
    const currentUser = state.currentUser;
    const { payload } = action;

    switch (action.type) {
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.SET_USER_START:
            return {
                ...state,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_OUT_START:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.SAVE_TUTORIAL_START:
            return { ...state, isLoading: true };
        case actionTypes.SAVE_TUTORIAL_SUCCESS:
            currentUser.savedTutorials = payload;

            return {
                ...state,
                isLoading: false,
                currentUser,
                message: "success",
            };
        case actionTypes.SAVE_TUTORIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.UPLOAD_PROFILE_IMAGE_START:
            return {
                ...state,
                isUploading: true,
            };
        case actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                profileImageURL: payload,
                isUploading: false,
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
                message: "",
                profileImageURL: "",
                isUploading: false,
                isLoading: false,
            };
        case actionTypes.UPDATE_USER_INFO_START:
            return {
                ...state,
                isLoading: true,
                message: "",
            };
        case actionTypes.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
                message: "success",
            };
        default:
            return state;
    }
};

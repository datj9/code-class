import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    mentorsList: [],
    mentor: {},
    isLoading: false,
    message: "",
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_MENTORS_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_MENTORS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                mentorsList: action.payload,
            };
        case actionTypes.GET_ONE_MENTOR_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_ONE_MENTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                mentor: action.payload,
            };

        case actionTypes.UPDATE_MENTOR_INFO_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.UPDATE_MENTOR_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: "success",
            };
        default:
            return state;
    }
}

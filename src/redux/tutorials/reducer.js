import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isFetchingMore: false,
    isSearching: false,
    total: 0,
    loaded: false,
    tutorials: [],
    tutorial: {},
    error: {},
    errors: {},
    message: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TUTORIALS_START:
            return {
                ...state,
                isLoading: action.payload.pageIndex === 1,
                isFetchingMore: action.payload.pageIndex > 1,
            };
        case actionTypes.FETCH_TUTORIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetchingMore: false,
                tutorials:
                    action.payload.pageIndex === 1
                        ? action.payload.tutorials
                        : state.tutorials.concat(action.payload.tutorials),
                total: action.payload.pageIndex === 1 ? action.payload.total : state.total,
            };
        case actionTypes.FETCH_TUTORIALS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFetchingMore: false,
                error: action.payload,
            };
        case actionTypes.FETCH_ONE_TUTORIAL_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_ONE_TUTORIAL_SUCCESS:
            return {
                ...state,
                tutorial: action.payload,
                isLoading: false,
            };
        case actionTypes.CLEAR_TUTORIAL:
            return {
                ...state,
                tutorial: {},
            };
        case actionTypes.GET_SAVED_TUTORIALS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_SAVED_TUTORIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tutorials: action.payload,
                loaded: true,
            };
        case actionTypes.SEARCH_TUTORIALS_START:
            return {
                ...state,
                isSearching: action.payload.pageIndex === 1,
                isFetchingMore: action.payload.pageIndex > 1,
            };
        case actionTypes.SEARCH_TUTORIALS_SUCCESS:
            return {
                ...state,
                isSearching: false,
                isFetchingMore: false,
                tutorials:
                    action.payload.pageIndex === 1
                        ? action.payload.tutorials
                        : state.tutorials.concat(action.payload.tutorials),
                total: action.payload.pageIndex === 1 ? action.payload.total : state.total,
            };
        case actionTypes.CLEAR_ALL_TUTORIALS:
            return {
                ...state,
                tutorials: [],
                loaded: false,
                errors: {},
            };
        default:
            return state;
    }
};

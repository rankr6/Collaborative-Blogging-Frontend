import { BlogActions, BlogAvailableAction, BlogState } from "./type";

export const initialState: BlogState = {
    blogs: [],
    blogDatas: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
};
export const BlogReducer = (
    state: BlogState = initialState,
    action: BlogActions
): BlogState => {
    switch (action.type) {
       
        case BlogAvailableAction.FETCH_BLOGS_REQUEST:
            return { ...state, isLoading: true };
        case BlogAvailableAction.FETCH_BLOGS_SUCCESS:
            return { ...state, isLoading: false, blogs: action.payload };
        case BlogAvailableAction.FETCH_BLOGS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };

            case BlogAvailableAction.FETCH_BLOGDATA_REQUEST:
            return { ...state, isLoading: true };
        case BlogAvailableAction.FETCH_BLOGDATA_SUCCESS:
            return { ...state, isLoading: false, blogs: action.payload };
        case BlogAvailableAction.FETCH_BLOGDATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};
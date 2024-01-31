import { API_ENDPOINT } from "../../config/constants";
import { BlogDispatch, BlogAvailableAction } from "./type";


export const fetchBlogs = async (dispatch: BlogDispatch) => {
    try {
        dispatch({ type: BlogAvailableAction.FETCH_BLOGS_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/blogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch({
            type: BlogAvailableAction.FETCH_BLOGS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        console.log("Error fetching blogs:", error);
        dispatch({
            type: BlogAvailableAction.FETCH_BLOGS_FAILURE,
            payload: "Unable to load blogs",
        });
    }
};

export const fetchBlogData = async (dispatch: BlogDispatch, blogID: string) => {
    try {
        dispatch({ type: BlogAvailableAction.FETCH_BLOGDATA_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/blogs/${blogID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // if (response.ok) {
        //     const data = await response.json();
        //     dispatch({
        //         type: BlogAvailableAction.FETCH_BLOGDATA_SUCCESS,
        //         payload: data,
        //     });
        // } else {
        //     throw new Error("Failed to fetch blog details");
        // }

        return response.json();
    } catch (error) {
        console.log("Error fetching blogs:", error);
        dispatch({
            type: BlogAvailableAction.FETCH_BLOGDATA_FAILURE,
            payload: "Unable to load blog data",
        });
    }
};

export interface Blog {
    id: number;
    blogTitle: string;
    blogDescription: string;
    location: string;
    date: string;
    blogThumbnail: string;
    likes: number;
}

export interface BlogData {
    id: number;
    blogTitle: string;
    blogDescription: string;
    location: string;
    date: string;
    blogThumbnail: string;
    likes: number;
}


export interface BlogState {
    blogs: Blog[];
    blogDatas: BlogData | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;

}


export enum BlogAvailableAction {
    FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST",
    FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS",
    FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE",
    FETCH_BLOGDATA_REQUEST = "FETCH_BLOGDATA_REQUEST",
    FETCH_BLOGDATA_SUCCESS = "FETCH_BLOGDATA_SUCCESS",
    FETCH_BLOGDATA_FAILURE = "FETCH_BLOGDATA_FAILURE",
}

export type BlogActions =
    | { type: BlogAvailableAction.FETCH_BLOGS_REQUEST }
    | { type: BlogAvailableAction.FETCH_BLOGS_SUCCESS; payload: Blog[] }
    | { type: BlogAvailableAction.FETCH_BLOGS_FAILURE; payload: string }
    | { type: BlogAvailableAction.FETCH_BLOGDATA_REQUEST }
    | { type: BlogAvailableAction.FETCH_BLOGDATA_SUCCESS; payload: BlogData[] }
    | { type: BlogAvailableAction.FETCH_BLOGDATA_FAILURE; payload: string }


export type BlogDispatch = React.Dispatch<BlogActions>;
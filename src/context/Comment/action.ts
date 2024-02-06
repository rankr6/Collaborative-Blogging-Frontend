/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { CommentAvailableAction, CommentDispatch } from "./type";

export const fetchComment = async (dispatch: CommentDispatch, blogID: string) => {
  const token = localStorage.getItem("token") ?? "";
  try {
    dispatch({ type: CommentAvailableAction.FETCH_COMMENT_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/blog/comments/${blogID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    if (!response)
      throw new Error("fetch comment faiure");

    const data = await response.json();
    dispatch({ type: CommentAvailableAction.FETCH_COMMENT_SUCCESS, payload: data.comments });
  }
  catch (error) {
    console.log(error);
    dispatch({ type: CommentAvailableAction.FETCH_COMMENT_FAILURE, payload: "unable to load comments" });
  }
}

export const addComments = async (dispatch: CommentDispatch, blogID: string, comment: any) => {
  const token = localStorage.getItem("token") ?? "";
  try {
    dispatch({ type: CommentAvailableAction.ADD_COMMENT_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/blog/comments/${blogID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      body: JSON.stringify(comment)
    });
    if (!response)
      throw new Error("fetch member faiure");

    const data = await response.json();
    console.log(data);
    dispatch({ type: CommentAvailableAction.ADD_COMMENT_SUCCESS });
    fetchComment(dispatch,blogID);
  }
  catch (error) {
    console.log(error);
    dispatch({ type: CommentAvailableAction.ADD_COMMENT_FAILURE, payload: "unable to load comments" });
  }
}
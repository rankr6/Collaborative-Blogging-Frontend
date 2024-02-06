import React from "react";

export interface Comment {
  id: number;
  text: string;
  blogID: number;
  updatedAt: Date;
  createdAt: Date;
  User: User;
}

interface User {
  id: number;
  firstName: string;
  email: string;
}
export type CommentData = Comment[]
export interface CommentState {
  comments: CommentData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum CommentAvailableAction {
  FETCH_COMMENT_REQUEST = "FETCH_COMMENT_REQUEST",
  FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENT_FAILURE = "FETCH_COMMENT_FAILURE",
  ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST",
  ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE",
}

export type CommentAction =
  | { type: CommentAvailableAction.FETCH_COMMENT_REQUEST }
  | { type: CommentAvailableAction.FETCH_COMMENT_SUCCESS, payload: CommentData }
  | { type: CommentAvailableAction.FETCH_COMMENT_FAILURE, payload: string }
  | { type: CommentAvailableAction.ADD_COMMENT_REQUEST }
  | { type: CommentAvailableAction.ADD_COMMENT_SUCCESS }
  | { type: CommentAvailableAction.ADD_COMMENT_FAILURE, payload: string };


export type CommentDispatch = React.Dispatch<CommentAction>;
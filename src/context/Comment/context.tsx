/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { commentReducer, initialCommentState } from "./reducer";
import { CommentDispatch, CommentState } from "./type";


const CommentStateContext = createContext<CommentState>(initialCommentState);
const CommentDispatchContext = createContext<CommentDispatch>(() => { });

export const CommentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialCommentState);
  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>
        {children}
      </CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  )
}

export const useCommentState = () => useContext(CommentStateContext);
export const useCommentDispatch = () => useContext(CommentDispatchContext);
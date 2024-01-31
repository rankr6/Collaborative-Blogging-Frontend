/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { BlogDispatch, BlogState } from "./type";
import { BlogReducer, initialState } from "./reducer";


const BlogStateContext = createContext<BlogState>(initialState);
const BlogDispatchContext = createContext<BlogDispatch>(() => {});

export const BlogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(BlogReducer, initialState);
  return (
    <BlogStateContext.Provider value={state}>
      <BlogDispatchContext.Provider value={dispatch}>
        {children}
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
};

export const useBlogState = () => useContext(BlogStateContext);
export const useBlogDispatch = () => useContext(BlogDispatchContext);
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { TeamDispatch, TeamState } from "./type";
import { TeamReducer, initialState } from "./reducer";

const TeamStateContext = createContext<TeamState>(initialState);
const TeamDispatchContext = createContext<TeamDispatch>(() => {});

export const TeamProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TeamReducer, initialState);
  return (
    <TeamStateContext.Provider value={state}>
      <TeamDispatchContext.Provider value={dispatch}>
        {children}
      </TeamDispatchContext.Provider>
    </TeamStateContext.Provider>
  );
};

export const useTeamState = () => useContext(TeamStateContext);
export const useTeamDispatch = () => useContext(TeamDispatchContext);



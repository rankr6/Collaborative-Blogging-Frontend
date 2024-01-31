
export interface Team {
    id: string;
    name: string;
    plays: string
}

export interface TeamState {
    teams: Team[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;

}


export enum TeamAvailableAction {
    FETCH_TEAMS_REQUEST = "FETCH_TEAMS_REQUEST",
    FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS",
    FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE",

}

export type TeamActions =
    | { type: TeamAvailableAction.FETCH_TEAMS_REQUEST }
    | { type: TeamAvailableAction.FETCH_TEAMS_SUCCESS; payload: Team[] }
    | { type: TeamAvailableAction.FETCH_TEAMS_FAILURE; payload: string }


export type TeamDispatch = React.Dispatch<TeamActions>;
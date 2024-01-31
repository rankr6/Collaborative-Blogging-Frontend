import { TeamActions, TeamAvailableAction, TeamState } from "./type";

export const initialState: TeamState = {
    teams: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    
};
export const TeamReducer = (
    state: TeamState = initialState,
    action: TeamActions
): TeamState => {
    switch (action.type) {
       
        case TeamAvailableAction.FETCH_TEAMS_REQUEST:
            return { ...state, isLoading: true };
        case TeamAvailableAction.FETCH_TEAMS_SUCCESS:
            return { ...state, isLoading: false, teams: action.payload };
        case TeamAvailableAction.FETCH_TEAMS_FAILURE:
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
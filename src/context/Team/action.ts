import { API_ENDPOINT } from "../../config/constants";
import { TeamAvailableAction, TeamDispatch } from "./type";

export const fetchTeams = async (dispatch: TeamDispatch) => {
    try {
        dispatch({ type: TeamAvailableAction.FETCH_TEAMS_REQUEST });
        const response = await fetch(`${API_ENDPOINT}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch({
            type: TeamAvailableAction.FETCH_TEAMS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        console.log("Error fetching sports:", error);
        dispatch({
            type: TeamAvailableAction.FETCH_TEAMS_FAILURE,
            payload: "Unable to load sports",
        });
    }
};

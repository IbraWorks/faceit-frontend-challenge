import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  ITournamentState,
  TournamentActionTypes,
  ITournament,
  GET_ALL_TOURNAMENT_SUCCESS,
  GET_ALL_TOURNAMENT_FAILURE,
  GET_ALL_TOURNAMENTS,
  CREATE_TOURNAMENT,
  DELETE_TOURNAMENT,
  DELETE_TOURNAMENT_FAILURE,
  EDIT_TOURNAMENT,
  GET_TOURNAMENT_BY_SEARCH_TERM
} from '../models/tournament';
import axios from 'axios';
import { API_TOURNAMENTS_URL } from '../constants/api';

export const getAllTournaments: ActionCreator<ThunkAction<
  Promise<any>,
  ITournamentState,
  null,
  TournamentActionTypes
>> = () => {
  console.log('in get all tourn');
  return async (dispatch: Dispatch) => {
    dispatch({
      type: GET_ALL_TOURNAMENTS
    });
    try {
      const resp = await axios.get<ITournament[]>(API_TOURNAMENTS_URL);
      dispatch({
        type: GET_ALL_TOURNAMENT_SUCCESS,
        payload: resp.data
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TOURNAMENT_FAILURE,
        payload: new Error('Something went wrong...')
      });
    }
  };
};

export const updateSearchTearm = (searchTerm: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: GET_TOURNAMENT_BY_SEARCH_TERM
    });

    try {
      const resp = await axios.get<ITournament[]>(
        `${API_TOURNAMENTS_URL}?q=${searchTerm}`
      );
      dispatch({
        type: GET_ALL_TOURNAMENT_SUCCESS,
        payload: resp.data
      });
      console.log(resp);
    } catch (error) {
      dispatch({
        type: GET_ALL_TOURNAMENT_FAILURE,
        payload: new Error()
      });
    }
  };
};

export const deleteTournament = (tournament: ITournament) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: DELETE_TOURNAMENT,
      payload: tournament.id
    });
    try {
      await axios.delete<ITournament>(
        `${API_TOURNAMENTS_URL}/${tournament.id}`
      );
    } catch (error) {
      dispatch({
        type: DELETE_TOURNAMENT_FAILURE,
        payload: tournament
      });
    }
  };
};

export const editTournament = (tournament: ITournament, newName: string) => {
  return async (dispatch: Dispatch) => {
    const oldName = tournament.name;
    tournament.name = newName;
    dispatch({
      type: EDIT_TOURNAMENT,
      payload: tournament
    });

    try {
      const resp = await axios.patch<ITournament>(
        `${API_TOURNAMENTS_URL}/${tournament.id}`,
        {
          name: tournament.name
        }
      );
      console.log(resp);
    } catch (error) {
      tournament.name = oldName;
      dispatch({
        type: EDIT_TOURNAMENT,
        payload: tournament
      });
    }
  };
};

export const createTournament = (tournamentName: string) => {
  return async (dispatch: Dispatch) => {
    const resp = await axios.post<ITournament>(API_TOURNAMENTS_URL, {
      name: tournamentName
    });
    console.log(resp);
    if (resp.status === 201) {
      dispatch({
        type: CREATE_TOURNAMENT,
        payload: resp.data
      });
    }
  };
};

/*
catch (error) {
      dispatch({
        type: GET_ALL_TOURNAMENT_FAILURE,
        payload: []
      });
*/

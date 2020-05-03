import { Reducer } from 'redux';
import {
  ITournamentState,
  TournamentActionTypes,
  GET_ALL_TOURNAMENT_SUCCESS,
  GET_ALL_TOURNAMENTS,
  GET_ALL_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT,
  DELETE_TOURNAMENT,
  DELETE_TOURNAMENT_FAILURE,
  EDIT_TOURNAMENT,
  EDIT_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_BY_SEARCH_TERM
} from '../models/tournament';

const initialState: ITournamentState = {
  listOfTournaments: [],
  loading: true,
  error: null
};

/// finish this
export const tournaments: Reducer<ITournamentState, TournamentActionTypes> = (
  state = initialState,
  action: TournamentActionTypes
): ITournamentState => {
  switch (action.type) {
    case GET_ALL_TOURNAMENTS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        listOfTournaments: [...action.payload]
      };
    case GET_ALL_TOURNAMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_TOURNAMENT:
      return {
        ...state,
        listOfTournaments: [...state.listOfTournaments, action.payload]
      };
    case DELETE_TOURNAMENT:
      return {
        ...state,
        listOfTournaments: state.listOfTournaments.filter(
          tourney => tourney.id !== action.payload
        )
      };
    case DELETE_TOURNAMENT_FAILURE:
      return {
        ...state,
        listOfTournaments: [...state.listOfTournaments, action.payload]
      };
    case EDIT_TOURNAMENT:
      return {
        ...state,
        listOfTournaments: state.listOfTournaments.map(tourney => {
          if (tourney.id === action.payload.id) {
            return action.payload;
          } else {
            return tourney;
          }
        })
      };
    case GET_TOURNAMENT_BY_SEARCH_TERM:
      return {
        ...state,
        loading: true,
        error: null
      };
    default:
      return state;
  }
};

export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: IParticipants;
  startDate: Date;
}

interface IParticipants {
  current: number;
  max: number;
}

export interface ITournamentState {
  listOfTournaments: ITournament[];
  loading: boolean;
  error: Error | null;
}

export const GET_ALL_TOURNAMENTS = 'REQUEST_TOURNAMENTS';
export const GET_ALL_TOURNAMENT_SUCCESS = 'GET_ALL_TOURNAMENT_SUCCESS';
export const GET_ALL_TOURNAMENT_FAILURE = 'GET_ALL_TOURNAMENT_FAILURE';

export const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT';

export const EDIT_TOURNAMENT = 'EDIT_TOURNAMENT';
export const EDIT_TOURNAMENT_FAILURE = 'EDIT_TOURNAMENT_FAILURE';

export const DELETE_TOURNAMENT = 'DELETE_TOURNAMENT';
export const DELETE_TOURNAMENT_FAILURE = 'DELETE_TOURNAMENT_FAILURE';

interface IGetAllTournaments {
  type: typeof GET_ALL_TOURNAMENTS;
}

interface ICreateTournament {
  type: typeof CREATE_TOURNAMENT;
  payload: ITournament;
}

// interface ICreateTournamentSuccess {
//   type: typeof CREATE_TOURNAMENT_SUCCESS
// }

// interface ICreateTournamentFailure {
//   type: typeof CREATE_TOURNAMENT_FAILURE,
//   payload: string
// }

interface IDeleteTournament {
  type: typeof DELETE_TOURNAMENT;
  payload: string;
}

interface IDeleteTournamentFailure {
  type: typeof DELETE_TOURNAMENT_FAILURE;
  payload: ITournament;
}

interface IEditTournament {
  type: typeof EDIT_TOURNAMENT;
  payload: ITournament;
}

interface IEditTournamentFailure {
  type: typeof EDIT_TOURNAMENT_FAILURE;
  payload: ITournament;
}

interface IGetAllTournamentSuccess {
  type: typeof GET_ALL_TOURNAMENT_SUCCESS;
  payload: ITournament[];
}

interface IGetAllTournamentFailure {
  type: typeof GET_ALL_TOURNAMENT_FAILURE;
  payload: Error;
}

type GetTournament =
  | IGetAllTournaments
  | IGetAllTournamentFailure
  | IGetAllTournamentSuccess;

type PostTournament = ICreateTournament;
type DeleteTournament = IDeleteTournament | IDeleteTournamentFailure;
type EditTournament = IEditTournament | IEditTournamentFailure;

export type TournamentActionTypes =
  | GetTournament
  | PostTournament
  | EditTournament
  | DeleteTournament;
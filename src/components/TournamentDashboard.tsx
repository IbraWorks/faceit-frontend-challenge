import React, { useEffect, useCallback } from 'react';
import H4 from './H4';
import Input from './Input';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import { ITournament } from '../models/tournament';
import {
  getAllTournaments,
  createTournament,
  deleteTournament,
  editTournament
} from '../actions/tournaments';
import { TournamentList } from './TournamentList';
import Loading from './Loading';
import { TournamentError } from './TournamentError';

interface StateProps {
  listOfTournaments: ITournament[];
  loading: boolean;
  errors: Error | null;
}

const TournamentDashboard: React.FC = () => {
  const { listOfTournaments, loading, errors } = useSelector<
    RootState,
    StateProps
  >((store: RootState) => {
    return {
      listOfTournaments: store.tournaments.listOfTournaments,
      loading: store.tournaments.loading,
      errors: store.tournaments.error
    };
  });
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(getAllTournaments());
  }, [stableDispatch]);

  const retryGetAllTournaments = () => {
    console.log('retrying bro');
    dispatch(getAllTournaments());
  };

  const editSelectedTournament = (tournament: ITournament) => {
    const newName = prompt('New Tournament name', '');
    if (newName) {
      stableDispatch(editTournament(tournament, newName));
    }
  };

  const createNewTournament = () => {
    let name = prompt('Tournament', '');
    if (name) {
      stableDispatch(createTournament(name));
    }
  };

  const deleteSelectedTournament = (tournament: ITournament) => {
    let confirmation = window.confirm('Do you really want to delete this');
    if (confirmation) {
      stableDispatch(deleteTournament(tournament));
    }
  };

  return (
    <div>
      <H4>FACEIT Tournaments</H4>
      <Input placeholder="Search for tournaments..." />
      <Button onClick={createNewTournament} style={{ float: 'inline-end' }}>
        CREATE TOURNAMENT
      </Button>

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Loading>
            <p>Loading tournaments...</p>
          </Loading>
        </div>
      ) : errors ? (
        <TournamentError handleRetry={retryGetAllTournaments} />
      ) : (
        <TournamentList
          tournaments={listOfTournaments}
          editTournament={editSelectedTournament}
          deleteTournament={deleteSelectedTournament}
        />
      )}
    </div>
  );
};

export default TournamentDashboard;

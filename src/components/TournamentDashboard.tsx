import React, { useEffect, useCallback } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import { ITournament } from '../models/tournament';
import {
  getAllTournaments,
  createTournament,
  deleteTournament,
  editTournament,
  updateSearchTearm
} from '../actions/tournaments';
import { TournamentList } from './TournamentList';
import Loading from './Loading';
import { TournamentError } from './TournamentError';
import Input from './Input';
import H4 from './H4';
import { simpleDebounce } from '../helpers/SimpleDebounce';

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

  const handleSearchChange = simpleDebounce((searchTerm: string) => {
    console.log(searchTerm);
    stableDispatch(updateSearchTearm(searchTerm));
  }, 2000);

  return (
    <div>
      <H4>FACEIT Tournaments</H4>
      <Input
        onChange={(e: any) => handleSearchChange(e.target.value)}
        placeholder="Search for tournaments..."
      />
      <Button onClick={createNewTournament} style={{ float: 'right' }}>
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

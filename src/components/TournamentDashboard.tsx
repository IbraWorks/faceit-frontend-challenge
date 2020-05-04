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
  // const stableDispatch = useCallback(dispatch, []);

  // useEffect(() => {
  //   stableDispatch(getAllTournaments());
  // }, [stableDispatch]);

  const fetchTournament = useCallback(() => {
    dispatch(getAllTournaments());
  }, [dispatch]); //to make the linter shut up

  useEffect(() => {
    fetchTournament();
  }, [fetchTournament]);

  const editSelectedTournament = (tournament: ITournament) => {
    const newName = prompt('New Tournament name:', '');
    if (newName) {
      dispatch(editTournament(tournament, newName));
    }
  };

  const createNewTournament = () => {
    let name = prompt('Tournament Name:', '');
    if (name) {
      dispatch(createTournament(name));
    }
  };

  const deleteSelectedTournament = (tournament: ITournament) => {
    let confirmation = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (confirmation) {
      dispatch(deleteTournament(tournament));
    }
  };

  const handleSearchChange = simpleDebounce((searchTerm: string) => {
    console.log(searchTerm);
    dispatch(updateSearchTearm(searchTerm));
  }, 1500);

  return (
    <div>
      <H4 style={{ marginLeft: '12px' }}>FACEIT Tournaments</H4>
      <Input
        style={{ marginLeft: '12px' }}
        onChange={(e: any) => handleSearchChange(e.target.value)}
        placeholder="Search tournament ..."
      />
      <Button
        onClick={createNewTournament}
        style={{ float: 'right', marginRight: '12px', marginTop: '-2px' }}
      >
        CREATE TOURNAMENT
      </Button>

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Loading>
            <p>Loading tournaments ...</p>
          </Loading>
        </div>
      ) : errors ? (
        <TournamentError handleRetry={fetchTournament} />
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

import React from 'react';
import { ITournament } from '../models/tournament';
import TournamentCard from './TournamentCard';
import TournamentGrid from './TournamentGrid';
import H6 from './H6';
import Button from './Button';

interface IProps {
  tournaments: ITournament[];
  editTournament: (tournament: ITournament) => void;
  deleteTournament: (tournament: ITournament) => void;
}

export const TournamentList: React.FC<IProps> = ({
  tournaments,
  editTournament,
  deleteTournament
}) => {
  return (
    <div>
      <TournamentGrid>
        {tournaments.map(tournament => (
          <TournamentCard key={tournament.id}>
            <H6>{tournament.name}</H6>
            <p>Organizer: {tournament.organizer}</p>
            <p>Game: {tournament.game}</p>
            <p>
              Participants: {tournament.participants.current}/
              {tournament.participants.max}
            </p>
            <p>Start: {tournament.startDate}</p>
            <Button onClick={() => editTournament(tournament)}>EDIT</Button>
            <Button onClick={() => deleteTournament(tournament)}>DELETE</Button>
          </TournamentCard>
        ))}
      </TournamentGrid>
    </div>
  );
};

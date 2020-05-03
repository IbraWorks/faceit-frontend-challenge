import React from 'react';
import Button from './Button';

interface IProps {
  handleRetry: () => void;
}

export const TournamentError: React.FC<IProps> = ({ handleRetry }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>Something went wrong</p>
      <Button onClick={handleRetry}>RETRY</Button>
    </div>
  );
};

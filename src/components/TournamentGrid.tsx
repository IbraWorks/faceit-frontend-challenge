import styled from 'styled-components';
import theme from '../theme';

const TournamentGrid = styled.div`
  margin-top: ${theme.spacing(6)};
  margin-left: 0;
  margin-right: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0em;

  grid-auto-rows: minmax(200px, auto);
`;

export default TournamentGrid;

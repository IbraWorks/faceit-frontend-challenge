import styled from 'styled-components';
import theme from '../theme';

const TournamentCard = styled.div`
  padding: ${theme.spacing(4)};
  margin: ${theme.spacing(3)};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  background-color: #1f1f1f;
  border-radius: 5px;
`;

export default TournamentCard;

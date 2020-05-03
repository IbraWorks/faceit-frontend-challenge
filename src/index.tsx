import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import Button from './components/Button';
import Input from './components/Input';
import TournamentGrid from './components/TournamentGrid';
import TournamentDashboard from './components/TournamentDashboard';

const App: React.FC = () => {
  return (
    <Container>
      <TournamentDashboard />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);

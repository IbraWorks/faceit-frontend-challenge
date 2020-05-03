import { combineReducers } from 'redux';
import { tournaments } from './tournaments';

export const rootReducer = combineReducers({
  tournaments
});

export type RootState = ReturnType<typeof rootReducer>;

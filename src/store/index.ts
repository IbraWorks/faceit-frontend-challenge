import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '../reducers';

const store: Store<RootState, any> = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;

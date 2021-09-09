import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  const composeEnhancers = compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}

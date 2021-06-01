import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './todo/todo-reducer';
import { save } from 'redux-localstorage-simple';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = () => (
  createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(save({ namespace: 'todo-list' }))
    ),
  )
);

const store = configureStore();

export default store;

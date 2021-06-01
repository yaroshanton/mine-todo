import { combineReducers } from 'redux';
import { load } from 'redux-localstorage-simple';
import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, CHANGE_FILTER } from './constants';

let TASKS = load({ namespace: 'todo-list' });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS = {
    tasks: [],
  };
}

const tasks = (state = TASKS.tasks, { id, text, isCompleted, type }) => {
  switch (type) {

    case ADD_TASK:
      return [
        ...state, {
          id,
          text,
          isCompleted,
        }
      ];

    case REMOVE_TASK:
      return [...state].filter(task => task.id !== id);

    case COMPLETE_TASK:
      return [...state].map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });

    default:
      return state;
  }
};

const filters = (state = 'all', { type, activeFilter }) => {
  switch (type) {

    case CHANGE_FILTER:
      return activeFilter;

    default:
      return state;
  }
};

const rootReducer = combineReducers({ tasks, filters });

export default rootReducer;

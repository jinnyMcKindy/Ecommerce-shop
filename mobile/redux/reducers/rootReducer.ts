import { combineReducers } from 'redux';
import { postsReducer } from './postsReducers';
export const rootReducer = combineReducers({
  posts: postsReducer
});
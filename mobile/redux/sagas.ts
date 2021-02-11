import { takeEvery, put } from 'redux-saga/effects'; 
import { FETCH_POSTS } from './types';

export function* SagaWatcher() {
  yield takeEvery(FETCH_POSTS, sagaWorker)  
}

function* sagaWorker() {
  yield 1;
}
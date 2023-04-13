import { all, fork } from 'redux-saga/effects';
import authSaga from './modules/authSaga';
import cateProdSaga from './modules/cateProd.saga';

export default function* rootSagas() {
  yield all([fork(authSaga), fork(cateProdSaga)]);
}

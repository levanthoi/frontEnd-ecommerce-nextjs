import { all, fork } from 'redux-saga/effects';
import authSaga from './modules/authSaga';

export default function* rootSagas() {
  yield all([fork(authSaga)]);
}

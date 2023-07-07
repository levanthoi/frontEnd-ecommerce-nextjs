import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { loginSuccess, loginFailure } from '@/redux/reducers/modules/auth';
import { loginAccount } from '@/services/user.service';
import { IAuth } from '@/lib/types/auth';

function* login(action: PayloadAction<IAuth>) {
  try {
    console.log('action', action);
    const result: AxiosResponse<any> = yield call(loginAccount, action.payload);
    console.log('result', result);
    yield put(loginSuccess(result.data));
  } catch (e: any) {
    yield put(loginFailure(e.response.data));
    console.log('error', e);
  }
}

function* authSaga() {
  yield all([takeLatest('auth/login', login)]);
}

export default authSaga;

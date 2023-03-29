import { PayloadAction } from '@reduxjs/toolkit';
import { call, all, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
// import { loginSuccess } from '@/redux/reducers/modules/user';
import { loginAccount } from '@/services/userService';
import { IAuth } from '@/lib/types/auth';

function* login(action: PayloadAction<IAuth>) {
  try {
    console.log('action', action);
    const result: AxiosResponse<any> = yield call(loginAccount, action.payload);
    console.log(result);
    // yield put(loginSuccess(result));
  } catch (e) {
    //   yield put(loginFailure(e.response.data));
    console.log('error', e);
  }
}

function* userSaga() {
  yield all([takeLatest('user/login', login)]);
}

export default userSaga;

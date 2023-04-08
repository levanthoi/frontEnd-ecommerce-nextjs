import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import { create } from '@/redux/reducers/modules/cateProd';
import { createCateProd } from '@/services/cateProd.service';

function* add(action: PayloadAction<ICateProd>) {
  try {
    // console.log('action', action);
    const result: AxiosResponse<any> = yield call(createCateProd, action.payload);
    // console.log(result);
    if (result) yield put(create(result.data));
  } catch (e: any) {
    console.log('error', e);
  }
}
// function* fetch() {
//   try {
//     const result: AxiosResponse<any> = yield call(getCateProd);
//     console.log('result', result);
//     // if (result) yield put(get(result.data));
//   } catch (e: any) {
//     console.log('error', e);
//   }
// }

function* cateProdSaga() {
  yield all([takeLatest('cateProd/add', add)]);
}

export default cateProdSaga;

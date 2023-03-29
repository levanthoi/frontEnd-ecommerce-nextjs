import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '@/lib/types/auth';
import { IAuthRootState } from '@/lib/types/state';

const initialState: IAuthRootState<IAuth> = {
  isLoading: false,
  isLogged: false,
  data: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state: IAuthRootState<IAuth>, { payload }: PayloadAction<any>) {
      //   console.log('action', action);
      return { ...state, isLogged: true, data: payload.data, message: payload.message };
    },
    loginFailure(state: IAuthRootState<IAuth>, { payload }: PayloadAction<any>) {
      // state.loading = false;
      // state.data = action.payload;
      console.log('asa', payload);
      return { ...state, message: payload.message, isLogged: false };
    },
  },
});

const { actions } = authSlice;
export const { loginSuccess, loginFailure } = actions;
export default authSlice;

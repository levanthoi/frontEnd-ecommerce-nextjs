import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthRootState } from '@/lib/types/state';
import { ICateProd } from '@/lib/types/admin/cateProd.type';

const initialState: IAuthRootState<ICateProd> = {
  isLoading: false,
  isLogged: false,
  data: null,
  message: '',
  success: false,
};

const cateProdSlice = createSlice({
  name: 'cateProd',
  initialState,
  reducers: {
    create(state: IAuthRootState<ICateProd>, { payload }: PayloadAction<any>) {
      console.log('payload', payload);

      return { ...state, data: payload.data, message: payload.message, success: payload?.success };
    },
  },
});

const { actions } = cateProdSlice;
export const { create } = actions;
export default cateProdSlice;

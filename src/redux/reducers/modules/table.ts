import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthRootState } from '@/lib/types/state';
import { ICateProd } from '@/lib/types/admin/cateProd.type';

const initialState: IAuthRootState<ICateProd> = {
  row: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    edit(state: IAuthRootState<ICateProd>, { payload }: PayloadAction<any>) {
      console.log('payload edit', payload);
      return { ...state, row: payload };
    },
  },
});

const { actions } = tableSlice;
export const { edit } = actions;
export default tableSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    loading: boolean,
    data: any
}

const initialState: UserState= {
    loading: false,
    data: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state: UserState, action: PayloadAction<UserState>) {
            // state.loading = false;
            // state.data = action.payload;
            return {...state, loading:false, data: action.payload}
          },
    }
})

const { actions} = userSlice;
export const {loginSuccess} = actions;
export default userSlice;

import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './modules/auth';

const sliceReducer = {
  [authSlice.name]: authSlice.reducer,
};

// const reducer = (state: ReturnType<typeof sliceReducer>, action: AnyAction) => {
//     if (action.type === HYDRATE) {
//       const nextState = {
//         ...state, // use previous state
//         ...action.payload, // apply delta from hydration
//       };
//       return nextState;
//     } else {
//       return sliceReducer(state, action);
//     }
//   };

const rootReducer = combineReducers(sliceReducer);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

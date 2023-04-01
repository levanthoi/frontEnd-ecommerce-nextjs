import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
import rootSagas from '@/redux/sagas/rootSagas';
import rootReducer from '@/redux/reducers/rootReducer';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleware.run(rootSagas);
  return store;
};

// export const wrapper = createWrapper(makeStore, { debug: true });

const store = makeStore();

// export type RootState = ReturnType<typeof store.getState>;

export default store;

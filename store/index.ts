import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelctor } from 'react-redux';
import user from './user';
import common from './common';
import auth from './auth';
import registerRoom from './registerRoom';

const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
});

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// 타입 지원되는 커스텀 useSelector만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelctor;

const initStore: MakeStore<any> = () => {
  const store = configureStore({
    reducer,
    // devTools: process.env.NODE_ENV !== 'production',
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);

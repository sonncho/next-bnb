import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../types/reduxStates';

// 초기 상태
const initialState: CommonState = {
  validateMode: false,
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // validatioeMode 변경하기
    setValidateMode(state: any, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };
export default common;

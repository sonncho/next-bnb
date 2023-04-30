import { UserType } from './user';

// User Redux State
export type UserState = UserType & {
  isLogged: boolean;
};

// 공통 ReduxState
export type CommonState = {
  validateMode: boolean;
};

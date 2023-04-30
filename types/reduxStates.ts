import { UserType } from './user';

// User Redux State
export type UserState = UserType & {
  isLogged: boolean;
};

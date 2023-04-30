import axios from 'axios';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 api
// eslint-disable-next-line import/prefer-default-export
export const singupAPI = (body: SignUpAPIBody) => axios.post<UserType>('/api/auth/signup', body);
